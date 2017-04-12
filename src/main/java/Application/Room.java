package Application;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by ivan on 12.4.2017 г..
 */

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String topic;
    private long maxPlayers;
    private long[] playerIds;

    public long getId() {
        return id;
    }

    public long getMaxPlayers() {
        return maxPlayers;
    }

    public void setMaxPlayers(long maxPlayers) {
        this.maxPlayers = maxPlayers;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public long[] getPlayerIds() {
        return playerIds;
    }
}
