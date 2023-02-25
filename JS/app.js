(function (data, ui) {

    const searchInputEl = document.querySelector("#input");
    const searchDropdownEl = document.querySelector("#search-dropdown");
    const mainContentWrapperEl = document.querySelector("#main-content");
    const homeButtonEl = document.querySelector("#home");
  
    const onSearch = (event) => {
      const term = event.target.value;
      data.searchShows(term).then((shows) => {
        ui.clearDropdownList();
        ui.renderSearchDropdownList(shows);
      });
    };

    const onSingleShowClick = (event) => {
      const targetEl = event.target.parentElement.parentElement;
      console.log(targetEl);
      if (targetEl.getAttribute("class") !== "show-item") {
        return;
      };
      const id = targetEl.getAttribute("id");
      console.log(id);
      data.getSingleTvShow(id).then((show) => {
        ui.renderSingleTvShowPage(show);
      });
    };

    const onSearchDropdownClick = (event) => {
      if (event.target.getAttribute("class") !== "search-item") {
        return;
      };
      ui.clearDropdownList();
      const id = event.target.getAttribute("id");
      data.getSingleTvShow(id).then((show) => {
        ui.renderSingleTvShowPage(show);
      });
    };

    const onHomeButtonClick = () => {
      data.getShows().then((shows) => {
        ui.renderTvShowsPage(shows);
      });
    };

    onHomeButtonClick();

    searchInputEl.addEventListener("keyup", onSearch);
    searchDropdownEl.addEventListener("click", onSearchDropdownClick);
    mainContentWrapperEl.addEventListener("click", onSingleShowClick);
    homeButtonEl.addEventListener("click", onHomeButtonClick);

})(dataModule, uiModule);