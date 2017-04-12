package Application;

import Application.Room;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by ivan on 12.4.2017 г..
 */

@RepositoryRestResource(collectionResourceRel = "rooms", path = "rooms")
public interface RoomRepository extends PagingAndSortingRepository<Room, Long> {
    List<Room> findById(@Param("id") long id);
}
