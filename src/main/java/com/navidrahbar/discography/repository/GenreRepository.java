package com.navidrahbar.discography.repository;

import com.navidrahbar.discography.entity.Album;
import com.navidrahbar.discography.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;

public interface GenreRepository extends JpaRepository<Genre, Integer> {

    @Query("SELECT COUNT(g) FROM Genre g WHERE g.name = ?1")
    int countGenresByName(String name);

    Optional<Set<Genre>> findByName(String name);

    @Query("SELECT CASE WHEN COUNT(g) > 0 THEN true ELSE false END FROM Genre g WHERE g.name = ?1")
    Boolean existsByName(String name);
}