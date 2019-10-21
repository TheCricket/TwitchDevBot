require('dotenv').config();
let cluster = require('cluster');

const MAIN = 1, SLACK = 2, HELP = 3, ANNOUNCEMENTS = 4;

if(cluster.isMaster) {
  let numWorkers = require('os').cpus().length;
  console.log(`Master cluster setting up ${numWorkers} workers...`);

  for(let c = 0; c < 4; c++) {
    cluster.fork();
  }

  cluster.on('online', worker => {
    console.log(`Worker ${worker.process.pid} reporting for duty!`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with error code: ${code}, and signal ${signal}`);
    console.log(`Starting a new worker`);
    cluster.fork();
  });

  function restartWorkers() {
    let wid, workerIds = [];
    for(wid in cluster.workers) {
      workerIds.push(wid);
    }

    workerIds.forEach(wid => {
      cluster.workers[wid].send({
        text: 'shutdown',
        from: 'master'
      });

      setTimeout(() => {
        if(cluster.workers[wid]) {
          cluster.workers[wid].kill('SIGKILL');
        }
      }, 5000);
    });
  }
} else if(cluster.worker.id === MAIN) {
  let commands = require('./commands/index');
  commands.init();
} else if(cluster.worker.id === SLACK) {
  let slack = require('./internal/index');
  slack.init();
} else if(cluster.worker.id === HELP) {
  let help = require('./help/index');
  help.init();
} else if(cluster.worker.id === ANNOUNCEMENTS) {
  let announcements = require('./announcements/index');
  announcements.init();
} else {

}
