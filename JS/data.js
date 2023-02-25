const dataModule = (function() {
 
    class TvShow {
      constructor(name, imageUrl, id, seasons, cast, crew, akas, episodes, summary, rating) {
        this.name = name,
        this.imageUrl = imageUrl,
        this.id = id,
        this.seasons = seasons,
        this.cast = cast,
        this.crew = crew,
        this.akas = akas,
        this.episodes = episodes,
        this.summary = summary,
        this.rating = rating
      };
    }

    class Season {
      constructor(startDate, endDate) {
        this.startDate = startDate,
        this.endDate = endDate
      };
    }

    const getShows = () => {
      return fetch ("http://api.tvmaze.com/shows")
      .then((response) => {return response.json()})
      .then ((shows) => {return shows.sort((a, b) => b.rating.average - a.rating.average)})
      .then((shows) => {return shows.slice(0, 50)})
      .then((showsRawObjects) => {return showsRawObjects.map(({name, image, id}) => new TvShow(name, image.original, id))});      
    }
    
    const searchShows = (term) => {
      return fetch (`https://api.tvmaze.com/search/shows?q=${term}`)
      .then((response) => {return response.json()})
      .then((shows) => {return shows.slice(0, 10)})
      .then((showsRawObjects) => {return showsRawObjects.map(({show}) => new TvShow(show.name, show.image?.original, show.id))})
    }

    const getSingleTvShow = (id) => {
      return fetch(`https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast&embed[]=crew&embed[]=akas&embed[]=episodes`)
      .then((response) => {return response.json()})
      .then((rawShow) => {
        const seasons = rawShow._embedded.seasons.map((season) => new Season(season.premiereDate, season.endDate));
        const cast = rawShow._embedded.cast.map((cast) => cast.person.name + " as " + cast.character.name);
        const crew = rawShow._embedded.crew.map((crew) => crew.type + ": " + crew.person.name);
        const akas = rawShow._embedded.akas.map((akas) => akas.country?.name + ": " + akas.name);
        const episodes = rawShow._embedded.episodes.map((episodes) => episodes.name + " S" + episodes.season + ", Ep" + episodes.number);
        console.log(rawShow._embedded);
        return new TvShow(
          rawShow.name,
          rawShow.image.original,
          rawShow.id,
          seasons,
          cast,
          crew,
          akas,
          episodes,
          rawShow.summary,
          rawShow.rating
        );
      });
    }

    return {getShows, searchShows, getSingleTvShow};
})();