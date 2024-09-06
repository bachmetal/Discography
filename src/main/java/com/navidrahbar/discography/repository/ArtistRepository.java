package com.navidrahbar.discography.repository;

import com.navidrahbar.discography.entity.Artist;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {
    @Query(value = "select a from Artist a join a.albums al join al.songs s " +
            "where s.name like %?1% " +
            "or al.name like %?1% " +
            "or a.name like %?1%")
    List<Artist> getSearchResult(String keyword);

    @Query(value = "select a from Artist a where a.name = ?1")
    Optional<Artist> findByName(String name);
}