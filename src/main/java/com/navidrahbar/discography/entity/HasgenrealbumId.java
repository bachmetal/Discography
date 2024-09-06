package com.navidrahbar.discography.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class HasgenrealbumId implements Serializable {
    private static final long serialVersionUID = -2186466789703267712L;
    @Column(name = "albumid", nullable = false)
    private Integer albumid;

    @Column(name = "genreid", nullable = false)
    private Integer genreid;

    public Integer getAlbumid() {
        return albumid;
    }

    public void setAlbumid(Integer albumid) {
        this.albumid = albumid;
    }

    public Integer getGenreid() {
        return genreid;
    }

    public void setGenreid(Integer genreid) {
        this.genreid = genreid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        HasgenrealbumId entity = (HasgenrealbumId) o;
        return Objects.equals(this.genreid, entity.genreid) &&
                Objects.equals(this.albumid, entity.albumid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(genreid, albumid);
    }

}