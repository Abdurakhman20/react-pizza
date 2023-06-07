import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import qs from "qs";
import Categories from "../components/Categories";
import Sort, { SORT_ITEMS_LIST } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/index";
import Pagination from "../components/Pagination";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
  selectSortProp,
} from "../redux/slices/filterSlice";
import {
  FetchPizzasArg,
  fetchPizzas,
  selectPizzas,
} from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  //const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //const isMounted = React.useRef(false);
  const sortProp = useSelector(selectSortProp);
  const { categoryId, sortType, sortMethod, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  const onChangePageHandler = (pageCount: number) => {
    dispatch(setCurrentPage(pageCount));
  };

  const getApiData = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    dispatch(
      fetchPizzas({
        category,
        sortProp,
        sortMethod,
        search,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  };

  // React.useEffect(() => {
  //   // Если не было первого рендера, тогда не надо вшивать в адресную строчку параметры
  //   if (isMounted.current) {
  //     const querryString = qs.stringify({
  //       sortProp,
  //       categoryId,
  //       currentPage,
  //       sortMethod,
  //     });
  //     navigate(`?${querryString}`);
  //   }
  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as FetchPizzasArg));
  //   }
  // }, [categoryId, sortProp, sortMethod, searchValue, currentPage]);

  React.useEffect(() => {
    getApiData();
  }, [categoryId, sortProp, sortMethod, searchValue, currentPage]);

  // React.useEffect(() => {
  //   // Если был первый рендер, то сохраняем URL-параметры и сохраняем в redux
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as FetchPizzasArg;
  //     const sort = SORT_ITEMS_LIST.find(
  //       (obj) => obj.sortProp === params.sortProp
  //     );
  //     if (sort) {
  //       params.sortProp = sort;
  //     }
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         sortMethod: params.sortMethod,
  //         currentPage: params.currentPage,
  //         sortType: sort || SORT_ITEMS_LIST[0],
  //       })
  //     );
  //     isMounted.current = true;
  //   }
  // }, []);

  const pizzasArr = items.map((pizza: any) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort sortType={sortType} sortMethod={sortMethod} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error">
          <h2 className="content__error-title">
            Произошла Ошибка <span>😕</span>
          </h2>
          <p className="content__error-text">
            К сожалению при получении данных с сервера произошла ошибка,
            <br /> наши специалисты уже решают эту проблему!
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzasArr}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={(pageCount: number) => onChangePageHandler(pageCount)}
      />
    </div>
  );
};

export default Home;
