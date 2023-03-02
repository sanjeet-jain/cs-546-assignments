//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

/*
import the router and create the follow routes using the GET http method

'/aboutme';
'/mystory';
'/educationhistory'




export the router */
import { Router } from "express";
const router = Router();

router.route("/aboutme").get(async (req, res) => {
  try {
    const returnObject = {
      firstName: "Sanjeet Vinod",
      lastName: "Jain",
      biography:
        "Since my childhood I was very fascinated by video games and how everything worked in the simulated world of computers, and that always kept me intrigued and curious about what its like to be a part of developing an idea into an actual working project.This obsession of finding solutions for challenging problems and exploring new ways of doing a task turned into my career as I majored in Computer Science during my Bachelor's degree.\nI believe that programming is a puzzle which I am constantly passionately engaged in solving. I enjoy learning new technologies and languages and use them for different projects and my problem-solving, decision-making and analytical skills motivate me to work on several projects involving various domains.",
      favoriteMovies: ["Iron Man", "Inception", "Phir Hera Pheri", "Golmaal"],
      hobbies: ["eSports", "Cosplay", "Snooker"],
      fondestMemory:
        "When i won my first cs:go college tournament with my friends and spent the earned cash prize on food",
    };
    return res.json(returnObject);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.route("/mystory").get(async (req, res) => {
  try {
    const returnObject = {
      storyTitle: "From Amateur to Pro: Sanjeet's Journey to CS:GO Glory",
      storyGenre: "eSports Fiction",
      story:
        "Sanjeet had always been a fan of first-person shooter games. When he discovered Counter-Strike: Global Offensive (CS:GO), he knew that this was the game he wanted to master. He spent countless hours practicing his skills, watching tutorials, and playing with his friends.\nSanjeet's dream was to become a professional CS:GO player and compete at the highest level. He knew that it was a difficult goal to achieve, but he was determined to make it happen. He started by participating in local tournaments, and slowly but steadily, he began to make a name for himself in the esports community.\nOne day, Sanjeet received an invitation to participate in a regional CS:GO tournament. He was overjoyed and knew that this was his chance to show the world what he was capable of. He spent weeks preparing for the tournament, practicing day and night, and fine-tuning his strategies.\nWhen the day of the tournament finally arrived, Sanjeet was nervous but excited. He entered the arena, greeted by a roaring crowd of fans, and took his place behind his computer. The game started, and Sanjeet played like he had never played before. He was in the zone, completely focused on the game, and his skills were on full display.\nThe tournament was intense, with many close matches and nail-biting moments. But Sanjeet persevered, and in the end, his team emerged victorious. They had won the tournament, and Sanjeet had played a pivotal role in their success. The crowd went wild, and Sanjeet was surrounded by his teammates, all of them hugging and congratulating each other.\nThat day, Sanjeet's dream had come true. He had proven himself as a skilled and talented CS:GO player, and he had achieved his goal of becoming a professional esports gamer. From that day forward, Sanjeet continued to compete in tournaments and win, becoming one of the most celebrated players in the CS:GO community.",
    };
    return res.json(returnObject);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.route("/educationhistory").get(async (req, res) => {
  try {
    const returnObject = [
      {
        schoolName: "Gopi Birla Memorial School",
        degreeEarned: "HSE",
        numberOfYearsAttended: 10,
        favoriteClasses: ["Math", "English", "P.T", "Science"],
        favoriteSchoolMemory:
          "Won best science project for magLev trains using basic magnets as a 10 year old",
      },
      {
        schoolName: "K.C College",
        degreeEarned: "MSBHSE",
        numberOfYearsAttended: 2,
        favoriteClasses: ["Math", "English", "Chemistry", "Computer Science"],
        favoriteSchoolMemory:
          "finding my girlfriend who is now with me for 9 years and more <3",
      },
      {
        schoolName: "Thadomal Shahani Engineering College",
        degreeEarned: "Bachelors of Engineering in Computer Science",
        numberOfYearsAttended: 2,
        favoriteClasses: ["Math", "Algorithms", "DBMS", "Machine Learning"],
        favoriteSchoolMemory:
          "none actually, the darkest 4 years of my life :)",
      },
    ];
    return res.json(returnObject);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
