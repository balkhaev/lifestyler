"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Flame, Clock, Dumbbell, Trophy, Share2 } from "lucide-react"

export default function WorkoutCompletion() {
  const [showShare, setShowShare] = useState(false)

  const workoutData = {
    duration: 45,
    caloriesBurned: 320,
    exercises: [
      { name: "Жим лежа", sets: 3, reps: 10, weight: 80 },
      { name: "Приседания", sets: 4, reps: 12, weight: 100 },
      { name: "Тяга верхнего блока", sets: 3, reps: 12, weight: 60 },
    ],
    achievements: [
      {
        name: "Новый рекорд в жиме лежа",
        description: "Вы подняли 80 кг в жиме лежа!",
      },
      {
        name: "Серия из 5 тренировок",
        description: "Вы тренировались 5 дней подряд!",
      },
    ],
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Тренировка завершена!
          </CardTitle>
          <CardDescription className="text-center">
            Отличная работа! Вот ваши результаты:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-around">
            <div className="text-center">
              <Clock className="mx-auto h-8 w-8 text-blue-500" />
              <p className="mt-1 font-semibold">{workoutData.duration} мин</p>
              <p className="text-sm text-gray-500">Длительность</p>
            </div>
            <div className="text-center">
              <Flame className="mx-auto h-8 w-8 text-orange-500" />
              <p className="mt-1 font-semibold">{workoutData.caloriesBurned}</p>
              <p className="text-sm text-gray-500">Калории</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Выполненные упражнения:</h3>
            {workoutData.exercises.map((exercise, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <div>
                  <Dumbbell className="inline-block mr-2 h-4 w-4" />
                  <span>{exercise.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {exercise.sets}x{exercise.reps} @ {exercise.weight}кг
                </span>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Достижения:</h3>
            {workoutData.achievements.map((achievement, index) => (
              <Card key={index} className="mb-2">
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-semibold flex items-center">
                    <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
                    {achievement.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-sm">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Прогресс к целям:</h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Недельная цель тренировок</span>
                  <span>4 из 5</span>
                </div>
                <Progress value={80} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Месячная цель сожженных калорий</span>
                  <span>3200 из 5000</span>
                </div>
                <Progress value={64} className="w-full" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setShowShare(!showShare)}>
            <Share2 className="mr-2 h-4 w-4" />
            Поделиться
          </Button>
          <Button>Завершить</Button>
        </CardFooter>
      </Card>

      {showShare && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Поделиться результатами</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around">
              <Button variant="outline">
                <svg
                  className="w-5 h-5 fill-current"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Facebook</title>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="ml-2">Facebook</span>
              </Button>
              <Button variant="outline">
                <svg
                  className="w-5 h-5 fill-current"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Twitter</title>
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <span className="ml-2">Twitter</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
