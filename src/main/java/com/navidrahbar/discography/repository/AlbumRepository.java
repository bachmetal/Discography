package com.navidrahbar.discography.repository;

import com.navidrahbar.discography.entity.Album;
import com.navidrahbar.discography.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

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
    List<Album> getAlbumBySongName(@Param("name") String name);

    @Query(value = "select * from Album a where a.ArtistId = ?1", nativeQuery = true)
    List<Album> findAllByArtistId(int artistId);
}