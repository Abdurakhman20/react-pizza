import React from "react";

const Categories = ({ value, onChangeCategory }) => {
  // Из Redux-Toolkit в Home.jsx получили value и onChangeCategory и передали в компонент Categories.jsx
  const categories = [
    // Массив с категориями для сортировки
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const onClickCategoryHandler = (index) => {
    // Функция вызывается при клике на категорию
    onChangeCategory(index);
    // Достали из пропсов и вызвали onChangeCategory в функции onClickCategoryHandler
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          // Итерация по массиву categories
          <li
            // Функция вызывается при клике на категорию
            onClick={() => onClickCategoryHandler(index)}
            className={value === index ? "active" : ""}
            // Если значение value(индекс выбранной категории) совпадает с индексом элемента массива
            // то присваиваем класс active
            key={index}
          >
            {
              //  Здесь выводим название категории
              category
            }
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
