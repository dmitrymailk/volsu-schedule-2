import React, { Component } from "react";
import { Link } from "react-router-dom";
import database from "./database";
import pure_circle from "../../img/minified/pure_circle.svg";
import personi from "../../img/minified/1.svg";
import booki from "../../img/minified/2.svg";
import roomi from "../../img/minified/3.svg";
import line from "../../img/minified/line.svg";
import check from "../../img/minified/check.svg";
export default class Schedule_2 extends Component {
  constructor() {
    super();
    this.state = {
      day: false,
    };
  }

  componentDidMount() {
    this.getLesson();
    this.changePointer();
  }

  componentDidUpdate() {
    this.changePointer();
  }

  getToday = () => {
    let getWeekDay = (date) => {
      let days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
      return days[date.getDay()];
    };

    let date = new Date();
    let today = getWeekDay(date);

    switch (today) {
      case "ПН":
        return 0;
      case "ВТ":
        return 1;
      case "СР":
        return 2;
      case "ЧТ":
        return 3;
      case "ПТ":
        return 4;
      case "СБ":
        return 5;
      case "ВС":
        return 6;
      default:
        return 0;
    }
  };

  getLesson = () => {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let toM = (h, m) => h * 60 + m;

    let lessons = [510, 610, 720, 820, 920];
    let currentlesson = 0;
    let currentTime = toM(h, m);
    while (currentTime >= lessons[currentlesson]) {
      currentlesson++;
    }
    // console.log("Current lesson", currentlesson);
    return currentlesson;
  };

  changePointer = () => {
    console.log("Change", this.getLesson());
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let toM = (h, m) => h * 60 + m;
    let lessons = [600, 700, 810, 910, 1000];
    let currentLesson = this.getLesson() - 1;
    let currentTime = toM(h, m);
    let today = this.state.day ? this.getToday() : 0;
    let todayTop = 520 * today;

    if (lessons[currentLesson] > currentTime) {
      let percent =
        (toM(1, 30) - lessons[currentLesson] + currentTime) / toM(1, 30);
      const heBlock = 94;
      let pointerMargin = heBlock * currentLesson + percent * 84 + 55;
      document.querySelector(".schedule__pointer").style.top = `${
        pointerMargin + todayTop
      }px`;
      // debugger;
    } else {
      document.querySelector(".schedule__pointer").style.top = `${
        92 * this.getLesson() + todayTop + 53
      }px`;
      if (currentTime > toM(16, 40)) {
        document.querySelector(".schedule__pointer").style.display = "none";
      }
    }

    // console.log("Current lesson", currentlesson);
  };

  weekType = () => {
    let weeks = [
      "2020-09-05",
      "2020-09-12",
      "2020-09-19",
      "2020-09-26",
      "2020-10-03",
      "2020-10-10",
      "2020-10-17",
      "2020-10-24",
      "2020-10-31",
      "2020-11-07",
      "2020-11-14",
      "2020-11-21",
      "2020-11-28",
      "2020-12-05",
      "2020-12-12",
      "2020-12-19",
      "2020-12-26",
      "2020-12-31",
    ];

    let currentDate = new Date();
    let i = 0;
    while (new Date(weeks[i]) <= currentDate) {
      i++;
      // console.log(new Date(weeks[i]), currentDate, i);
    }
    if ((i - 1) % 2 == 0) {
      return "- числитель";
    } else {
      return "- знаменатель";
    }
  };

  render() {
    let {
      match: {
        params: { id },
      },
    } = this.props;

    let data = database[+id];
    let { day } = this.state;
    let today = this.getToday();
    return (
      <div className="schedule">
        <Link to="/">
          <div className="returning-header">
            <div className="returning-header__arrow">
              <svg
                width={10}
                height={18}
                viewBox="0 0 10 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1L1 9L9 17"
                  stroke="#B2C6CB"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="returning-header__title">
              {data.group} {this.weekType()}
            </div>
          </div>
        </Link>
        <div className="schedule__menu">
          {/* <div className="schedule__menu-switch">
            <div className="container">
              <span />
              <span />
              <span />
            </div>
          </div> */}
          <div className="schedule__menu-list schedule__menu-list_close">
            <span>
              В избранное{" "}
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.4791 10.9789C23.9516 10.5149 24.1183 9.83392 23.9146 9.20089C23.7103 8.56787 23.1783 8.11598 22.5247 8.02008L16.7135 7.16911C16.466 7.13278 16.2522 6.97634 16.1416 6.75016L13.5436 1.4433C13.2519 0.847079 12.6598 0.476562 12 0.476562C11.3406 0.476562 10.7486 0.847079 10.4569 1.4433L7.85835 6.75016C7.74782 6.97634 7.53348 7.13278 7.28598 7.16911L1.4748 8.02057C0.821693 8.11598 0.28969 8.56787 0.0854436 9.20089C-0.118323 9.83392 0.0484389 10.5149 0.52085 10.9789L4.72545 15.1093C4.90471 15.2856 4.98689 15.5394 4.94459 15.7874L3.9522 21.6202C3.8407 22.2755 4.10262 22.925 4.63654 23.3164C5.16999 23.7082 5.86443 23.759 6.44929 23.4486L11.6463 20.6947C11.8678 20.5774 12.1322 20.5774 12.3537 20.6947L17.5512 23.4486C17.8049 23.5832 18.0798 23.6496 18.3533 23.6496C18.7084 23.6496 19.0621 23.5377 19.3639 23.3164C19.8979 22.925 20.1598 22.2755 20.0483 21.6202L19.0554 15.7879C19.0131 15.5394 19.0953 15.2861 19.2745 15.1098L23.4791 10.9789ZM18.1087 15.9516L19.1011 21.7839C19.151 22.0774 19.0381 22.3579 18.7988 22.5332C18.559 22.708 18.2605 22.7293 17.9986 22.5918L12.8011 19.8374C12.5507 19.7052 12.2749 19.6383 12 19.6383C11.7251 19.6383 11.4497 19.7052 11.1989 19.8379L6.00235 22.5918C5.73947 22.7293 5.44103 22.708 5.20171 22.5332C4.96238 22.3579 4.84992 22.0779 4.89942 21.7839L5.89182 15.9516C5.98745 15.3888 5.80243 14.8143 5.39682 14.4162L1.19174 10.2853C0.979804 10.0771 0.907717 9.78355 0.999508 9.50021C1.09082 9.21639 1.32006 9.02169 1.61273 8.97858L7.42343 8.12761C7.98427 8.04575 8.46917 7.69122 8.71955 7.17879L11.3181 1.87193C11.4488 1.60458 11.704 1.44523 11.9995 1.44523C12.2956 1.44523 12.5503 1.60458 12.6815 1.87193L15.28 7.17879C15.5303 7.69122 16.0148 8.04575 16.5756 8.12761L22.3868 8.97858C22.6795 9.02169 22.9087 9.21639 23 9.50021C23.0913 9.78355 23.0197 10.0771 22.8078 10.2853L18.6032 14.4157C18.1976 14.8143 18.0125 15.3883 18.1087 15.9516Z"
                  fill="#DEA243"
                />
              </svg>
            </span>
            <span>
              Следить за дз{" "}
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M23.6108 10.87C22.2639 9.14303 20.5192 7.71452 18.5654 6.73905C16.5709 5.74329 14.4253 5.22663 12.1855 5.19954C12.1238 5.19785 11.8761 5.19785 11.8144 5.19954C9.57464 5.22668 7.42899 5.74329 5.43455 6.73905C3.48076 7.71452 1.73612 9.14298 0.389118 10.87C-0.129788 11.5353 -0.129788 12.4646 0.389118 13.1299C1.73607 14.8569 3.48076 16.2855 5.43455 17.2609C7.42899 18.2567 9.5746 18.7733 11.8144 18.8004C11.8761 18.8021 12.1238 18.8021 12.1855 18.8004C14.4253 18.7733 16.5709 18.2567 18.5654 17.2609C20.5192 16.2855 22.2638 14.857 23.6108 13.1299C24.1297 12.4645 24.1297 11.5353 23.6108 10.87ZM5.87072 16.3874C4.04635 15.4765 2.41707 14.1425 1.15899 12.5295C0.915853 12.2177 0.915853 11.7823 1.15899 11.4705C2.41702 9.8575 4.0463 8.52344 5.87072 7.61256C6.38888 7.35391 6.918 7.13022 7.45693 6.94085C6.07046 8.18716 5.19694 9.99334 5.19694 12C5.19694 14.0067 6.07051 15.813 7.45711 17.0593C6.91819 16.8699 6.38893 16.6461 5.87072 16.3874ZM12 17.8267C8.7871 17.8267 6.17325 15.2128 6.17325 11.9999C6.17325 8.78702 8.7871 6.17322 12 6.17322C15.2129 6.17322 17.8267 8.78706 17.8267 12C17.8267 15.2129 15.2129 17.8267 12 17.8267ZM22.841 12.5294C21.583 14.1424 19.9537 15.4765 18.1293 16.3874C17.6117 16.6457 17.0829 16.8684 16.5447 17.0576C17.9302 15.8114 18.8031 14.0057 18.8031 11.9999C18.8031 9.99301 17.9293 8.18659 16.5426 6.94028C17.0817 7.12971 17.611 7.35367 18.1293 7.61247C19.9537 8.52334 21.583 9.8574 22.8411 11.4704C23.0842 11.7822 23.0842 12.2177 22.841 12.5294Z"
                    fill="black"
                  />
                  <path
                    d="M12 9.50641C10.625 9.50641 9.50647 10.625 9.50647 11.9999C9.50647 13.3749 10.625 14.4934 12 14.4934C13.3749 14.4934 14.4935 13.3749 14.4935 11.9999C14.4935 10.625 13.375 9.50641 12 9.50641ZM12 13.5172C11.1634 13.5172 10.4827 12.8366 10.4827 11.9999C10.4827 11.1633 11.1633 10.4827 12 10.4827C12.8366 10.4827 13.5172 11.1633 13.5172 11.9999C13.5172 12.8366 12.8366 13.5172 12 13.5172Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width={24} height={24} fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </div>
        </div>
        <div className="schedule__controls">
          <div
            className={`schedule__controls-button schedule__controls-button_${
              day ? "disable" : "active"
            }`}
            onClick={() => (day ? this.setState({ day: false }) : null)}
          >
            Сегодня
          </div>
          <div
            className={`schedule__controls-button schedule__controls-button_${
              !day ? "disable" : "active"
            }`}
            onClick={() => (!day ? this.setState({ day: true }) : null)}
          >
            Неделя
          </div>
        </div>
        <div className="schedule__week">
          <div className="schedule__pointer"></div>
          {day ? (
            data.content.map((item, i) => {
              let light = today == i ? true : false;
              return (
                <Day
                  name={item.name}
                  lessons={item.lessons}
                  key={new Date().getTime()}
                  getLesson={this.getLesson}
                  light={light}
                />
              );
            })
          ) : (
            <Day
              name={data.content[today].name}
              lessons={data.content[today].lessons}
              getLesson={this.getLesson}
              light={true}
            />
          )}
        </div>
      </div>
    );
  }
}

class Lesson extends Component {
  convertType = (type) => {
    switch (type) {
      case 0:
        return "lesson__type_practice";
      case 1:
        return "lesson__type_lab";
      case 2:
        return "lesson__type_active";
      case 3:
        return "lesson__type_lecture";
      case 4:
        return "lesson__type_none";
      default:
        return "lesson__type_none";
    }
  };

  render() {
    let { start, end, name, person, room, type } = this.props;
    return (
      <div className="day__lesson">
        <div className="wrapper_1">
          <div className="lesson__person">
            <img alt="" src={personi} />
            <span>{person}</span>
          </div>
          <div className="lesson__subject">
            <img alt="" src={booki} />
            {name}
          </div>
          <div className="lesson__room">
            <img alt="" src={roomi} />
            {room}
          </div>
        </div>

        <div className="wrapper_2">
          <div className="lesson__time">
            <span>{start}</span>
            <span>{end}</span>
          </div>
          <div className={`lesson__type ${this.convertType(type)}`}></div>
        </div>
      </div>
    );
  }
}

class Day extends Component {
  render() {
    let { name, lessons, getLesson, light } = this.props;
    return (
      <div className="day">
        <div className="day__title">{name}</div>
        <div className="day__body">
          <div className="day__pipeline">
            {[1, 2, 3, 4, 5].map((item) => {
              return item <= getLesson() && light ? (
                <PipelineItem active={true} />
              ) : (
                <PipelineItem active={false} />
              );
            })}
          </div>
          <div className="day__lessons">
            {lessons.map((item) => {
              let { start, end, name, person, room, type } = item;
              return (
                <Lesson
                  start={start}
                  end={end}
                  name={name}
                  person={person}
                  room={room}
                  type={type}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

class PipelineItem extends Component {
  render() {
    let { active } = this.props;
    if (active) {
      return (
        <div className="pipeline__wrapper">
          <div className="pipeline__active">
            <img alt="" className="" src={check} />
          </div>
          <div className="pipeline__line">
            <img alt="" src={line} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="pipeline__wrapper">
          <div className="pipeline__disable">
            <img alt="" className="" src={pure_circle} />
          </div>
          <div className="pipeline__line">
            <img alt="" src={line} />
          </div>
        </div>
      );
    }
  }
}
