package com.navidrahbar.discography.repository;

import com.navidrahbar.discography.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Integer> {
  @Query(value="select name from song where id=:albumId", nativeQuery = true)
  List<Song> getAllSongsById(int albumId);
}