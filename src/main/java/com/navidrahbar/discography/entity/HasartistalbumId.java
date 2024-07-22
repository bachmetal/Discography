package com.navidrahbar.discography.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class HasartistalbumId implements Serializable {
    private static final long serialVersionUID = 6525233954211869348L;
    @Column(name = "artistid", nullable = false)
    private Integer artistid;

    @Column(name = "albumid", nullable = false)
    private Integer albumid;

    public Integer getArtistid() {
        return artistid;
    }

    public void setArtistid(Integer artistid) {
        this.artistid = artistid;
    }

    public Integer getAlbumid() {
        return albumid;
    }

    public void setAlbumid(Integer albumid) {
        this.albumid = albumid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        HasartistalbumId entity = (HasartistalbumId) o;
        return Objects.equals(this.albumid, entity.albumid) &&
                Objects.equals(this.artistid, entity.artistid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(albumid, artistid);
    }

}