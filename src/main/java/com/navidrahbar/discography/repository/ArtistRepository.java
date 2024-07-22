package com.navidrahbar.discography.repository;

import com.navidrahbar.discography.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {
}