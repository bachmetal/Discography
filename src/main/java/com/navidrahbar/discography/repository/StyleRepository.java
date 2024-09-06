package com.navidrahbar.discography.repository;

import com.navidrahbar.discography.entity.Style;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StyleRepository extends JpaRepository<Style, Integer> {
    Optional<Style> findStyleByName(String name);
}