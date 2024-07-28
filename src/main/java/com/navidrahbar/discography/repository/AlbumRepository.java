package com.navidrahbar.discography.repository;

import com.navidrahbar.discography.entity.Album;
import com.navidrahbar.discography.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AlbumRepository extends JpaRepository<Album, Integer> {
  @Query(value = "SELECT\n" +
          "    al.id,\n" +
          "    al.name,\n" +
          "    al.thumbnailphoto,\n" +
          "    al.year,\n" +
          "    al.artistId\n" +
          "FROM\n" +
          "    album al\n" +
          "JOIN artist ON artist.id = al.ArtistId\n" +
          "JOIN song ON al.id = song.albumid\n" +
          "WHERE\n" +
          "    song.NAME LIKE %:name%", nativeQuery = true)
  Album getAlbumBySongName(String name);
}