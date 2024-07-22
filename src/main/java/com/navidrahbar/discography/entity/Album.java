package com.navidrahbar.discography.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "album")
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "NAME", nullable = false, length = 250)
    private String name;

    @Column(name = "thumbnailphoto", length = 500)
    private String thumbnailphoto;

    @Column(name = "year")
    private Integer year;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getThumbnailphoto() {
        return thumbnailphoto;
    }

    public void setThumbnailphoto(String thumbnailphoto) {
        this.thumbnailphoto = thumbnailphoto;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

}