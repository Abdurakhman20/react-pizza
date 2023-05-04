import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/index";
import Pagination from "../components/Pagination";

const Home = ({ searchValue, setSearchValue }) => {
  const [pizzasData, setPizzasData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProp: "rating",
  });
  const [sortMethod, setSortMethod] = React.useState("asc");
  const [currentPage, setCurrentPage] = React.useState(1);
  const getApiData = async () => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const response = await fetch(
      `https://644feb3cba9f39c6ab6fd55e.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProp}&order=${sortMethod}${search}`
    ).then((response) => response.json());

    setPizzasData(response);
    setIsLoading(false);
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getApiData();
  }, [categoryId, sortType, sortMethod, searchValue, currentPage]);

  const pizzasArr = pizzasData.map((pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(index) => setCategoryId(index)}
        />
        <Sort
          value={sortType}
          onChangeSort={setSortType}
          sortMethod={sortMethod}
          onChangeSortMethod={setSortMethod}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzasArr}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
