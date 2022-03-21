const Categories = require('../../core/utils/Categories');

exports.run = async (client, message, args) => {
    message.channel.send(
        `Here are the Cliff Notes on the CSP Changes for Extensions:`
        + "\n"
        + `- Forum Post on new Policy <https://discuss.dev.twitch.tv/t/new-extensions-policy-for-content-security-policy-csp-directives-and-timeline-for-enforcement/33695>`
        + "\n"
        + `- Related Barry Blog Post <https://barrycarlyon.co.uk/wordpress/2021/11/21/twitch-extensions-part-6-dev-environment-updates-content-security-policy/>`
        + "\n"
        + `- NPM Module for local testing <https://www.npmjs.com/package/twitchextensioncsp>`
        + "\n"
        + `- Test your Local/testing Build (if web accessabile) <https://securityheaders.com/>`
        + "\n"
        + `- The new dashboard fields (Dev Console -> Manage an Extension -> Manage a Version -> Capabilties) https://barrycarlyon.co.uk/wordpress/wp-content/uploads/2021/10/extension_dashboard_newcspfields-1024x621.png`
    );
};

exports.conf = {
    enabled: true,
    aliases: [],
    ranks: [],
};

exports.help = {
    name: 'csp',
    category: Categories.HELP,
    description: `You done forgot about CSP`,
    usage: '!csp'
};
