package com.navidrahbar.discography.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class HasstylealbumId implements Serializable {
    private static final long serialVersionUID = 2285299364504237095L;
    @Column(name = "styleid", nullable = false)
    private Integer styleid;

    @Column(name = "albumid", nullable = false)
    private Integer albumid;

    public Integer getStyleid() {
        return styleid;
    }

    public void setStyleid(Integer styleid) {
        this.styleid = styleid;
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
        HasstylealbumId entity = (HasstylealbumId) o;
        return Objects.equals(this.styleid, entity.styleid) &&
                Objects.equals(this.albumid, entity.albumid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(styleid, albumid);
    }

}