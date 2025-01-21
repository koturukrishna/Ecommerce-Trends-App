import { BsSearch } from "react-icons/bs";

import "./index.css";

const FiltersGroup = (props) => {
  const {
    searchInput,
    categoryOptions,
    ratingsList,
    changeSearchInput,
    enterSearchInput,
    activeCategoryId,
    activeRatingId,
    changeCategory,
    changeRating,
    clearFilters,
  } = props;
  const RenderRatingsFiltersList = (props) => {
    const { changeRating, activeRatingId, ratingsList } = props;
    return (
      <ul>
        {ratingsList.map((rating) => {
          const onClickRatingItem = () => changeRating(rating.ratingId);
          const ratingClassName =
            activeRatingId === rating.ratingId
              ? `and-up active-rating`
              : `and-up`;
          return (
            <li
              className="rating-item"
              key={rating.ratingId}
              onClick={onClickRatingItem}
            >
              <img
                src={rating.imageUrl}
                alt={`rating ${rating.ratingId}`}
                className="rating-image"
              />
              <p className={ratingClassName}>& up</p>
            </li>
          );
        })}
      </ul>
    );
  };

  const RenderRatingsFilters = (props) => (
    <div>
      <h1 className="rating-heading">Rating</h1>
      <ul className="ratings-list">
        <RenderRatingsFiltersList {...props} />
      </ul>
    </div>
  );

  const RenderCategoriesList = (props) => {
    const { changeCategory, activeCategoryId, categoryOptions } = props;

    return categoryOptions.map((category) => {
      const onClickCategoryItem = () => changeCategory(category.categoryId);
      const isActive = category.categoryId === activeCategoryId;
      const categoryClassName = isActive
        ? `category-name active-category-name`
        : `category-name`;

      return (
        <li
          className="category-item"
          key={category.categoryId}
          onClick={onClickCategoryItem}
        >
          <p className={categoryClassName}>{category.name}</p>
        </li>
      );
    });
  };

  const RenderProductCategories = (props) => (
    <>
      <h1 className="category-heading">Category</h1>
      <ul className="categories-list">
        <RenderCategoriesList {...props} />
      </ul>
    </>
  );

  const onEnterSearchInput = (event) => {
    if (event.key === "Enter") {
      enterSearchInput();
    }
  };

  const onChangeSearchInput = (event) => {
    changeSearchInput(event.target.value);
  };

  return (
    <div className="filters-group-container">
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>

      <RenderProductCategories
        categoryOptions={categoryOptions}
        activeCategoryId={activeCategoryId}
        changeCategory={changeCategory}
      />
      <RenderRatingsFilters
        ratingsList={ratingsList}
        activeRatingId={activeRatingId}
        changeRating={changeRating}
      />
      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FiltersGroup;
