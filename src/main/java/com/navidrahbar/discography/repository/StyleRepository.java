package com.navidrahbar.discography.repository;

import com.navidrahbar.discography.entity.Style;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;

public interface StyleRepository extends JpaRepository<Style, Integer> {
    @Query("SELECT COUNT(s) FROM Style s WHERE s.name = ?1")
    int countStylesByName(String name);

    Set<Style> findAllByNameIn(Collection<String> name);

    Optional<Set<Style>> findByName(String name);
}