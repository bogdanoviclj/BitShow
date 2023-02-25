const uiModule = (function() {
   
    const mainContentWrapperEl = document.querySelector("#main-content");
    const searchDropdownEl = document.querySelector("#search-dropdown");
    
    const renderTvShowsPage = (shows) => {
      let html = `
      <h1 class="text-center my-4"> Popular Shows </h1>
      <div id="show-list" class="row d-flex justify-content-center m-0">
      `;
      shows.forEach((show) => {
        html += `
        <div class="show-item" id="${show.id}">
          <div class="card" style="width: 18vw">
              <img class="card-img-top" src="${show.imageUrl}" alt="Show cover image">
              <p class="card-text px-2 py-3"> ${show.name} </p>
          </div>
        </div>
        `
      });
      html += `
      </div>
      `;
      mainContentWrapperEl.innerHTML = html;
    }   

    const renderSearchDropdownList = (shows) => {
      shows.forEach((show) => {
        const itemEl = document.createElement("div");
        itemEl.setAttribute("id", show.id);
        itemEl.classList.add("search-item");
        itemEl.textContent = show.name;
        searchDropdownEl.appendChild(itemEl);
      })
    }
 
    const clearDropdownList = () => {
      searchDropdownEl.innerHTML = "";
    }

    const renderSingleTvShowPage = (show) => {
      let seasonsListHtml = "";
      let numberOfSeasons = 0;
      console.log(show);
      show.seasons.forEach(({startDate, endDate}) => {
        numberOfSeasons++;
        seasonsListHtml += `
          <li class="season-item"> ${startDate} - ${endDate} </li>
        `;
      });

      let castListHtml = "";
      show.cast.forEach((string) => {
        castListHtml += `
          <li class="cast-item"> ${string} </li>
        `;
      });

      let crewListHtml = "";
      show.crew.forEach((string) => {
        crewListHtml += `
          <li class="crew-item"> ${string} </li>
        `
      });

      let akasListHtml = "";
      show.akas.forEach((string) => {
        akasListHtml += `
          <li class="akas-item"> ${string} </li>
        `
      });

      let episodesListHtml = "";
      show.episodes.forEach((string) => {
        episodesListHtml += `
          <li class="episode-item"> ${string} </li>
        `
      });

      let html = `
      <div class="container" style="width: 900px">
        <h1 class="text-center my-4"> ${show.name} </h1>
        <div class="d-flex flex-column justify-content-center">
          <div class="info-wrapper d-flex flex-row justify-content-center">
            <img src="${show.imageUrl}" class="single-page-image">
            <div class="season px-5">
              <h2 class="py-2"> Seasons (${numberOfSeasons}) </h2>
              <ul class="px-5"> ${seasonsListHtml} </ul>
              <h2 class="py-2"> Cast </h2>
              <ul class="px-5"> ${castListHtml} </ul>
            </div>
          </div>
          <div class="info">
            <h2 class="py-2"> Show Details </h2>
            <p> ${show.summary} </p>
            <h2 class="py-2"> Crew </h2>
            <ul class="px-5"> ${crewListHtml} </ul>
            <h2 class="py-2"> Akas </h2>
            <ul class="px-5"> ${akasListHtml} </ul>
            <h2 class="py-2"> Episodes </h2>
            <ul class="px-5"> ${episodesListHtml} </ul>
          </div>
        </div>
      </div>
      `;
    mainContentWrapperEl.innerHTML = html;
    };
    
  return {renderTvShowsPage, renderSearchDropdownList, clearDropdownList, renderSingleTvShowPage};
})();