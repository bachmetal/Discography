package com.navidrahbar.discography.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "hasstylealbum")
public class Hasstylealbum {
    @EmbeddedId
    private HasstylealbumId id;

    @MapsId("styleid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "styleid", nullable = false)
    private Style styleid;

    @MapsId("albumid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "albumid", nullable = false)
    private Album albumid;

    public HasstylealbumId getId() {
        return id;
    }

    public void setId(HasstylealbumId id) {
        this.id = id;
    }

    public Style getStyleid() {
        return styleid;
    }

    public void setStyleid(Style styleid) {
        this.styleid = styleid;
    }

    public Album getAlbumid() {
        return albumid;
    }

    public void setAlbumid(Album albumid) {
        this.albumid = albumid;
    }

}