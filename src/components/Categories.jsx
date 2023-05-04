import React from "react";

const Categories = ({ value, onChangeCategory }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const onClickCategoryHandler = (index) => {
    onChangeCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => onClickCategoryHandler(index)}
            className={value === index ? "active" : ""}
            key={index}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
