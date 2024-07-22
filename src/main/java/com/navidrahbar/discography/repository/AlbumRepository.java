package com.navidrahbar.discography.repository;

import com.navidrahbar.discography.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album, Integer> {
}