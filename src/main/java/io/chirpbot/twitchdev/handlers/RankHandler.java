package io.chirpbot.twitchdev.handlers;

import io.chirpbot.twitchdev.TwitchDev;
import sx.blah.discord.api.events.EventSubscriber;
import sx.blah.discord.handle.impl.events.ReadyEvent;
import sx.blah.discord.handle.obj.IGuild;
import sx.blah.discord.handle.obj.IUser;

public class RankHandler {

	@EventSubscriber
	public void onReady(ReadyEvent event) {
		IGuild twitch = TwitchDev.getBot().getGuildByID(504015559252377601L);
		for (IUser user : twitch.getUsers()) {
			System.out.println(twitch.getRoles());

			//if(user.getRolesForGuild(twitch).contains())
		}
	}
}
