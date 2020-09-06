import React, { Component } from "react";
import ItemContainer from "./item-container/ItemContainer";
import Favorite from "../favorite/Favorite";
import InstituteItem from "../institute-item/InstituteItem";
import HomeworkItem from "../homework-item/HomeworkItem";
import AnotherProducts from "../another-products/AnotherProducts";
import MenuBurger from "../menu-burger/MenuBurger";

const favorite = {
  title: "Расписание",
  components: [
    {
      Component: Favorite,
      title: "MOC-191",
      color: "#FADE00",
      id: "0",
    },
    // {
    //   Component: Favorite,
    //   title: "ФЛб-191",
    //   color: "#FFAF38",
    //   id: "1"
    // }
    // {
    //   Component: Favorite,
    //   title: "MOC-191",
    //   color: "#FADE00",
    //   id: "0"
    // },
    // {
    //   Component: Favorite,
    //   title: "MOC-192",
    //   color: "#FADE00",
    //   id: "1"
    // }
  ],
};

const institute = {
  title: "",
  components: [
    {
      Component: InstituteItem,
      title: "",
      color: "#1B2126",
    },
    // {
    //   Component: InstituteItem,
    //   title: "ИФМК",
    //   color: "#FFAF38"
    // },
    // {
    //   Component: InstituteItem,
    //   title: "ИМИТ",
    //   color: "#FADE00"
    // },
    // {
    //   Component: InstituteItem,
    //   title: "ИФМК",
    //   color: "#FFAF38"
    // }
  ],
};

const homework = {
  title: "",
  components: [
    // {
    //   Component: HomeworkItem,
    //   title: "Алгебра и теория чисел",
    // },
    // {
    //   Component: HomeworkItem,
    //   title: "Геометрия и топология",
    // },
    // {
    //   Component: HomeworkItem,
    //   title: "Русский язык",
    // },
    // {
    //   Component: HomeworkItem,
    //   title: "Алгебра и теория чисел",
    // },
    // {
    //   Component: HomeworkItem,
    //   title: "Геометрия и топология",
    // },
    // {
    //   Component: HomeworkItem,
    //   title: "Русский язык",
    // },
  ],
};

const another = {
  title: "Другие продукты",
  components: [
    {
      Component: AnotherProducts,
      title: "Лекториум",
      backColor: "#264E70",
      textColor: "#FFF",
      link: "https://test-new-lectorium.firebaseapp.com/",
    },
    // {
    //   Component: AnotherProducts,
    //   title: "Lingvo Gap",
    //   backColor: "#2F964D",
    //   textColor: "#FFF",
    //   link: "https://lingvo-gap.com/",
    // },
  ],
};

export default class MainScreen extends Component {
  startLesson = (e, target, link) => {
    if (target) {
      window.open(link);
      e.preventDefault();
    }
    e.stopPropagation();
  };
  render() {
    return (
      <div className="main-wrapper">
        <a
          className="main-wrapper__author"
          to=""
          target="_blank"
          onClick={(e) => this.startLesson(e, true, "https://vk.com/dimweb")}
        >
          @dimweb
        </a>
        {/* <MenuBurger /> */}

        <ItemContainer title={another.title} components={another.components} />
        <ItemContainer
          title={homework.title}
          components={homework.components}
        />

        <ItemContainer
          title={institute.title}
          components={institute.components}
        />
        <ItemContainer
          title={favorite.title}
          components={favorite.components}
        />
      </div>
    );
  }
}
