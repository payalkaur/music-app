export interface Albums {
    href: string
    limit: number
    next: string
    offset: number
    previous: string
    total: number
    items: Item[]
}

export interface Item {
    album_type: string
    total_tracks: number
    available_markets: string[]
    external_urls: ExternalUrls
    href: string
    id: string
    images: Image[]
    name: string
    release_date: string
    release_date_precision: string
    type: string
    uri: string
    artists: Artist[]
}

export interface ExternalUrls {
    spotify: string
}

export interface Image {
    url: string
    height: number
    width: number
}

export interface Artist {
    external_urls: ExternalUrls
    href: string
    id: string
    name: string
    type: string
    uri: string
}
