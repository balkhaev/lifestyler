import React, { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Clock,
  Target,
  Dumbbell,
  Edit,
  Plus,
  Trash2,
  Award,
  Camera,
  Weight,
  Ruler,
  Heart,
  Activity,
  Zap,
  Trophy,
  Star,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Slider } from "@/components/ui/slider"

interface Goal {
  id: number
  name: string
  startValue: number
  currentValue: number
  target: number
  unit: string
  type: string
  startDate: Date
  steps: number
}

interface CompletedGoal extends Goal {
  completionDate: Date
  duration: number // in days
}

interface Achievement {
  id: number
  name: string
  icon: React.ReactNode
}

interface BodyParameter {
  name: string
  value: string
  unit: string
  icon: React.ReactNode
  group: string
}

interface WorkoutWeight {
  id: number
  name: string
  exercises: { id: number; name: string; weight: string }[]
}

interface ChangeTracker {
  goals: { [id: number]: Goal }
  bodyParameters: { [name: string]: string }
  workoutWeights: { [id: number]: { [exerciseId: number]: string } }
}

const defaultTypes = ["gain", "loss", "distance", "strength"]

const bodyParameterGroups = [
  { name: "Основные", icon: <Activity className="h-5 w-5" /> },
  { name: "Верхняя часть тела", icon: <Dumbbell className="h-5 w-5" /> },
  { name: "Нижняя часть тела", icon: <Weight className="h-5 w-5" /> },
  { name: "Другое", icon: <Ruler className="h-5 w-5" /> },
]

const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: string
): number => {
  if (gender === "male") {
    return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
  } else {
    return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
  }
}

export default function Component() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [nextWorkout] = useState({
    date: new Date(currentDateTime.getTime() + 24 * 60 * 60 * 1000),
    place: "Фитнес-центр 'Олимп'",
    muscleGroup: "Грудь и бицепс",
  })
  const [goals, setGoals] = useState<Goal[]>([])
  const [completedGoals, setCompletedGoals] = useState<CompletedGoal[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newGoal, setNewGoal] = useState<Goal>({
    id: 0,
    name: "",
    startValue: 0,
    currentValue: 0,
    target: 0,
    unit: "",
    type: "",
    startDate: new Date(),
    steps: 0,
  })
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [customTypes, setCustomTypes] = useState<string[]>([])
  const [bodyParameters, setBodyParameters] = useState<BodyParameter[]>([
    {
      name: "Возраст",
      value: "30",
      unit: "лет",
      icon: <Clock className="h-5 w-5" />,
      group: "Основные",
    },
    {
      name: "Рост",
      value: "180",
      unit: "см",
      icon: <Ruler className="h-5 w-5" />,
      group: "Основные",
    },
    {
      name: "Вес",
      value: "80",
      unit: "кг",
      icon: <Weight className="h-5 w-5" />,
      group: "Основные",
    },
    {
      name: "Плечи",
      value: "120",
      unit: "см",
      icon: <Dumbbell className="h-5 w-5" />,
      group: "Верхняя часть тела",
    },
    {
      name: "Грудь",
      value: "100",
      unit: "см",
      icon: <Ruler className="h-5 w-5" />,
      group: "Верхняя часть тела",
    },
    {
      name: "Талия",
      value: "80",
      unit: "см",
      icon: <Ruler className="h-5 w-5" />,
      group: "Верхняя часть тела",
    },
    {
      name: "Бедра",
      value: "95",
      unit: "см",
      icon: <Ruler className="h-5 w-5" />,
      group: "Нижняя часть тела",
    },
    {
      name: "Бицепс правый",
      value: "35",
      unit: "см",
      icon: <Dumbbell className="h-5 w-5" />,
      group: "Верхняя часть тела",
    },
    {
      name: "Бицепс левый",
      value: "34",
      unit: "см",
      icon: <Dumbbell className="h-5 w-5" />,
      group: "Верхняя часть тела",
    },
    {
      name: "Нога правая",
      value: "55",
      unit: "см",
      icon: <Ruler className="h-5 w-5" />,
      group: "Нижняя часть тела",
    },
    {
      name: "Нога левая",
      value: "54",
      unit: "см",
      icon: <Ruler className="h-5 w-5" />,
      group: "Нижняя часть тела",
    },
    {
      name: "Пульс в покое",
      value: "60",
      unit: "уд/мин",
      icon: <Heart className="h-5 w-5" />,
      group: "Другое",
    },
  ])
  const [workoutWeights, setWorkoutWeights] = useState<WorkoutWeight[]>([
    {
      id: 1,
      name: "Грудь",
      exercises: [
        { id: 1, name: "Жим обычный", weight: "80" },
        { id: 2, name: "Жим 30°", weight: "70" },
        { id: 3, name: "Жим гантели", weight: "30" },
      ],
    },
    {
      id: 2,
      name: "Бицепс",
      exercises: [
        { id: 4, name: "Стоя", weight: "20" },
        { id: 5, name: "Сидя", weight: "18" },
        { id: 6, name: "В скотте", weight: "16" },
      ],
    },
    {
      id: 3,
      name: "Трицепс",
      exercises: [
        { id: 7, name: "Француз", weight: "25" },
        { id: 8, name: "Узкий", weight: "60" },
      ],
    },
  ])
  const [editingWorkoutWeight, setEditingWorkoutWeight] =
    useState<WorkoutWeight | null>(null)
  const [isEditWorkoutWeightDialogOpen, setIsEditWorkoutWeightDialogOpen] =
    useState(false)
  const [avatarUrl, setAvatarUrl] = useState(
    "/placeholder.svg?height=80&width=80"
  )
  const [isGoalCompletionDialogOpen, setIsGoalCompletionDialogOpen] =
    useState(false)
  const [completedGoal, setCompletedGoal] = useState<Goal | null>(null)
  const [changeTracker, setChangeTracker] = useState<ChangeTracker>({
    goals: {},
    bodyParameters: {},
    workoutWeights: {},
  })
  const [isChangesSummaryDialogOpen, setIsChangesSummaryDialogOpen] =
    useState(false)

  const achievements: Achievement[] = [
    {
      id: 1,
      name: "Первая тренировка",
      icon: <Award className="h-6 w-6 text-yellow-500" />,
    },
    {
      id: 2,
      name: "10 тренировок подряд",
      icon: <Award className="h-6 w-6 text-green-500" />,
    },
    {
      id: 3,
      name: "Личный рекорд",
      icon: <Award className="h-6 w-6 text-blue-500" />,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAddGoal = () => {
    setIsAddDialogOpen(true)
  }

  const handleSaveNewGoal = () => {
    const goalWithId = {
      ...newGoal,
      id: goals.length + 1,
      startDate: new Date(),
      steps: 0,
    }
    setGoals([...goals, goalWithId])
    setIsAddDialogOpen(false)
    if (
      !defaultTypes.includes(newGoal.type) &&
      !customTypes.includes(newGoal.type)
    ) {
      setCustomTypes([...customTypes, newGoal.type])
    }
    setNewGoal({
      id: 0,
      name: "",
      startValue: 0,
      currentValue: 0,
      target: 0,
      unit: "",
      type: "",
      startDate: new Date(),
      steps: 0,
    })
  }

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal)
    setIsEditDialogOpen(true)
  }

  const handleSaveEditedGoal = () => {
    if (editingGoal) {
      setGoals(goals.map((g) => (g.id === editingGoal.id ? editingGoal : g)))
      setIsEditDialogOpen(false)
      if (
        !defaultTypes.includes(editingGoal.type) &&
        !customTypes.includes(editingGoal.type)
      ) {
        setCustomTypes([...customTypes, editingGoal.type])
      }
      setEditingGoal(null)
    }
  }

  const handleDeleteGoal = (goalId: number) => {
    setGoals(goals.filter((g) => g.id !== goalId))
  }

  const handleDeleteCustomType = (type: string) => {
    setCustomTypes(customTypes.filter((t) => t !== type))
  }

  const calculateProgress = (goal: Goal) => {
    return (
      ((goal.currentValue - goal.startValue) /
        (goal.target - goal.startValue)) *
      100
    )
  }

  const getProgressText = (goal: Goal) => {
    return `Прогресс: ${goal.currentValue.toFixed(1)} ${goal.unit} из ${
      goal.target
    } ${goal.unit}`
  }

  const handleGoalProgress = (goalId: number, newValue: number) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const updatedGoal = { ...goal, currentValue: newValue }
        setChangeTracker((prev) => ({
          ...prev,
          goals: { ...prev.goals, [goalId]: updatedGoal },
        }))
        return updatedGoal
      }
      return goal
    })

    setGoals(updatedGoals)
  }

  const handleBodyParameterChange = (name: string, value: string) => {
    const newBodyParameters = bodyParameters.map((param) =>
      param.name === name ? { ...param, value } : param
    )
    setBodyParameters(newBodyParameters)
    setChangeTracker((prev) => ({
      ...prev,
      bodyParameters: { ...prev.bodyParameters, [name]: value },
    }))
  }

  const handleWorkoutWeightChange = (
    groupId: number,
    exerciseId: number,
    weight: string
  ) => {
    const newWorkoutWeights = workoutWeights.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          exercises: group.exercises.map((exercise) =>
            exercise.id === exerciseId ? { ...exercise, weight } : exercise
          ),
        }
      }
      return group
    })
    setWorkoutWeights(newWorkoutWeights)
    setChangeTracker((prev) => ({
      ...prev,
      workoutWeights: {
        ...prev.workoutWeights,
        [groupId]: { ...prev.workoutWeights[groupId], [exerciseId]: weight },
      },
    }))
  }

  const handleSaveAllChanges = () => {
    // Here you would typically send the changes to a backend API
    // For this example, we'll just clear the change tracker and show the summary dialog
    setIsChangesSummaryDialogOpen(true)
    setChangeTracker({ goals: {}, bodyParameters: {}, workoutWeights: {} })
  }

  const handleConfirmGoalCompletion = () => {
    if (completedGoal) {
      const completionDate = new Date()
      const duration = Math.ceil(
        (completionDate.getTime() - completedGoal.startDate.getTime()) /
          (1000 * 3600 * 24)
      )
      const newCompletedGoal: CompletedGoal = {
        ...completedGoal,
        completionDate,
        duration,
      }
      setCompletedGoals((prev) => [...prev, newCompletedGoal])
      setGoals(goals.filter((g) => g.id !== completedGoal.id))
    }
    setIsGoalCompletionDialogOpen(false)
    setCompletedGoal(null)
  }

  const handleCancelGoalCompletion = () => {
    if (completedGoal) {
      setGoals(
        goals.map((g) =>
          g.id === completedGoal.id ? { ...g, currentValue: g.target - 0.1 } : g
        )
      )
    }
    setIsGoalCompletionDialogOpen(false)
    setCompletedGoal(null)
  }

  const handleDeleteCompletedGoal = (goalId: number) => {
    setCompletedGoals(completedGoals.filter((g) => g.id !== goalId))
  }

  const handleEditWorkoutWeight = (workoutWeight: WorkoutWeight) => {
    setEditingWorkoutWeight(workoutWeight)
    setIsEditWorkoutWeightDialogOpen(true)
  }

  const handleSaveEditedWorkoutWeight = () => {
    if (editingWorkoutWeight) {
      setWorkoutWeights(
        workoutWeights.map((w) =>
          w.id === editingWorkoutWeight.id ? editingWorkoutWeight : w
        )
      )
      setIsEditWorkoutWeightDialogOpen(false)
      setEditingWorkoutWeight(null)
    }
  }

  const handleAddWorkoutWeight = () => {
    const newWorkoutWeight: WorkoutWeight = {
      id: workoutWeights.length + 1,
      name: "Новая группа мышц",
      exercises: [],
    }
    setWorkoutWeights([...workoutWeights, newWorkoutWeight])
  }

  const handleDeleteWorkoutWeight = (id: number) => {
    setWorkoutWeights(workoutWeights.filter((w) => w.id !== id))
  }

  const handleAddExercise = (workoutWeightId: number) => {
    const updatedWorkoutWeights = workoutWeights.map((w) => {
      if (w.id === workoutWeightId) {
        return {
          ...w,
          exercises: [
            ...w.exercises,
            {
              id: Math.max(0, ...w.exercises.map((e) => e.id)) + 1,
              name: "Новое упражнение",
              weight: "0",
            },
          ],
        }
      }
      return w
    })
    setWorkoutWeights(updatedWorkoutWeights)
  }

  const handleDeleteExercise = (
    workoutWeightId: number,
    exerciseId: number
  ) => {
    const updatedWorkoutWeights = workoutWeights.map((w) => {
      if (w.id === workoutWeightId) {
        return {
          ...w,
          exercises: w.exercises.filter((e) => e.id !== exerciseId),
        }
      }
      return w
    })
    setWorkoutWeights(updatedWorkoutWeights)
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const hasChanges =
    Object.keys(changeTracker.goals).length > 0 ||
    Object.keys(changeTracker.bodyParameters).length > 0 ||
    Object.keys(changeTracker.workoutWeights).length > 0

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Профиль</CardTitle>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {currentDateTime.toLocaleString()}
                </p>
              </div>
            </div>
            <CardDescription>
              Ваша личная информация и статистика
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={avatarUrl} alt="User" />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <label
                      htmlFor="avatar-upload"
                      className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer"
                    >
                      <Camera className="h-4 w-4" />
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                    </label>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Иван Иванов</h2>
                    <p className="text-gray-500">@ivan_fitness</p>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="font-semibold">Следующая тренировка:</h3>
                  <p>{nextWorkout.date.toLocaleString()}</p>
                  <p>{nextWorkout.place}</p>
                  <p>{nextWorkout.muscleGroup}</p>
                  <Progress
                    value={
                      ((nextWorkout.date.getTime() -
                        currentDateTime.getTime()) /
                        (24 * 60 * 60 * 1000)) *
                      100
                    }
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <Label>Время тренировок</Label>
                    <p className="text-lg font-medium">6 месяцев</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Достижения</Label>
                  <div className="flex flex-wrap gap-2">
                    {achievements.map((achievement) => (
                      <Badge
                        key={achievement.id}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {achievement.icon}
                        {achievement.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-gray-500" />
                    <Label>Цели</Label>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleAddGoal}>
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить цель
                  </Button>
                </div>
                {goals.map((goal) => (
                  <Card key={goal.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{goal.name}</h3>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditGoal(goal)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteGoal(goal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Progress
                      value={calculateProgress(goal)}
                      className="mb-2"
                    />
                    <p className="text-sm text-gray-500 mb-2">
                      {getProgressText(goal)}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Slider
                        value={[goal.currentValue]}
                        min={goal.startValue}
                        max={goal.target}
                        step={0.1}
                        onValueChange={(value) =>
                          handleGoalProgress(goal.id, value[0])
                        }
                      />
                      <Input
                        type="number"
                        value={goal.currentValue}
                        onChange={(e) => {
                          const newValue = parseFloat(e.target.value) || 0
                          handleGoalProgress(goal.id, newValue)
                        }}
                        className="w-24"
                      />
                      <span className="text-sm text-gray-500">{goal.unit}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Начальное значение: {goal.startValue} {goal.unit}
                    </p>
                    <p className="text-sm text-gray-500">
                      Шаги до цели: {goal.steps}
                    </p>
                  </Card>
                ))}
              </div>

              {completedGoals.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                    Достигнутые цели
                  </h3>
                  {completedGoals.map((goal) => (
                    <Card key={goal.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-md font-semibold">{goal.name}</h4>
                        <Badge variant="outline">Достигнута</Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Достигнуто: {goal.target} {goal.unit}
                      </p>
                      <p className="text-sm text-gray-500">
                        Время достижения: {goal.duration} дней
                      </p>
                      <p className="text-sm text-gray-500">
                        Дата завершения:{" "}
                        {goal.completionDate.toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Шаги до цели: {goal.steps}
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Удалить
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Это действие нельзя отменить. Цель будет удалена
                              из истории без возможности восстановления.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteCompletedGoal(goal.id)}
                            >
                              Удалить
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </Card>
                  ))}
                </div>
              )}

              <Separator />

              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Параметры тела
                </Label>
                {bodyParameterGroups.map((group) => (
                  <Card key={group.name} className="p-4">
                    <h3 className="text-md font-semibold mb-2 flex items-center">
                      {group.icon}
                      <span className="ml-2">{group.name}</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {bodyParameters
                        .filter((param) => param.group === group.name)
                        .map((param) => (
                          <div
                            key={param.name}
                            className="flex items-center space-x-2"
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center">
                                    {param.icon}
                                    <Label className="ml-2">{param.name}</Label>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{param.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <Input
                              type="number"
                              value={param.value}
                              onChange={(e) =>
                                handleBodyParameterChange(
                                  param.name,
                                  e.target.value
                                )
                              }
                              className="w-20"
                            />
                            <span className="text-sm text-gray-500">
                              {param.unit}
                            </span>
                          </div>
                        ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Профиль</CardTitle>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {currentDateTime.toLocaleString()}
                </p>
              </div>
            </div>
            <CardDescription>
              Ваша личная информация и статистика
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold flex items-center">
                  <Dumbbell className="h-5 w-5 mr-2" />
                  Рабочий вес
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddWorkoutWeight}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить группу мышц
                </Button>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {workoutWeights.map((group) => (
                  <AccordionItem key={group.id} value={group.name}>
                    <AccordionTrigger className="flex justify-between items-center">
                      <span>{group.name}</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditWorkoutWeight(group)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteWorkoutWeight(group.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {group.exercises.map((exercise) => (
                          <div
                            key={exercise.id}
                            className="flex items-center space-x-2"
                          >
                            <Input
                              value={exercise.name}
                              onChange={(e) => {
                                const newWorkoutWeights = workoutWeights.map(
                                  (w) => {
                                    if (w.id === group.id) {
                                      return {
                                        ...w,
                                        exercises: w.exercises.map((ex) =>
                                          ex.id === exercise.id
                                            ? { ...ex, name: e.target.value }
                                            : ex
                                        ),
                                      }
                                    }
                                    return w
                                  }
                                )
                                setWorkoutWeights(newWorkoutWeights)
                              }}
                              className="w-1/2"
                            />
                            <Input
                              type="number"
                              value={exercise.weight}
                              onChange={(e) =>
                                handleWorkoutWeightChange(
                                  group.id,
                                  exercise.id,
                                  e.target.value
                                )
                              }
                              className="w-20"
                            />
                            <span className="text-sm text-gray-500">кг</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleDeleteExercise(group.id, exercise.id)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddExercise(group.id)}
                          className="mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Добавить упражнение
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Расчет БЖУ
              </Label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">Белки</p>
                  <p>
                    {Math.round(
                      parseInt(
                        bodyParameters.find((p) => p.name === "Вес")?.value ||
                          "0"
                      ) * 2.2
                    )}{" "}
                    г
                  </p>
                </div>
                <div>
                  <p className="font-medium">Жиры</p>
                  <p>
                    {Math.round(
                      parseInt(
                        bodyParameters.find((p) => p.name === "Вес")?.value ||
                          "0"
                      ) * 0.8
                    )}{" "}
                    г
                  </p>
                </div>
                <div>
                  <p className="font-medium">Углеводы</p>
                  <p>
                    {Math.round(
                      (calculateBMR(
                        parseInt(
                          bodyParameters.find((p) => p.name === "Вес")?.value ||
                            "0"
                        ),
                        parseInt(
                          bodyParameters.find((p) => p.name === "Рост")
                            ?.value || "0"
                        ),
                        parseInt(
                          bodyParameters.find((p) => p.name === "Возраст")
                            ?.value || "0"
                        ),
                        "male" // Assuming male for this example
                      ) -
                        (parseInt(
                          bodyParameters.find((p) => p.name === "Вес")?.value ||
                            "0"
                        ) *
                          2.2 *
                          4 +
                          parseInt(
                            bodyParameters.find((p) => p.name === "Вес")
                              ?.value || "0"
                          ) *
                            0.8 *
                            9)) /
                        4
                    )}{" "}
                    г
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Расчет основан на формуле Миффлина-Сан Жеора и вашем текущем
                весе.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {hasChanges && (
        <div className="fixed bottom-4 right-4">
          <Button onClick={handleSaveAllChanges} className="animate-pulse">
            <Star className="h-4 w-4 mr-2" />
            Поздравляем! Вы достигли новых результатов
          </Button>
        </div>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавить новую цель</DialogTitle>
            <DialogDescription>
              Введите параметры новой цели. Нажмите добавить, когда закончите.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-name" className="text-right">
                Название
              </Label>
              <Input
                id="new-name"
                value={newGoal.name}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-start-value" className="text-right">
                Начальное значение
              </Label>
              <Input
                id="new-start-value"
                type="number"
                value={newGoal.startValue}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    startValue: parseFloat(e.target.value) || 0,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-target" className="text-right">
                Цель
              </Label>
              <Input
                id="new-target"
                type="number"
                value={newGoal.target}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    target: parseFloat(e.target.value) || 0,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-unit" className="text-right">
                Единица
              </Label>
              <Input
                id="new-unit"
                value={newGoal.unit}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, unit: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-type" className="text-right">
                Тип
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Select
                  value={newGoal.type}
                  onValueChange={(value) =>
                    setNewGoal({ ...newGoal, type: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите тип цели" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...defaultTypes, ...customTypes].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                        {customTypes.includes(type) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteCustomType(type)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Свой тип"
                  value={newGoal.type}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, type: e.target.value })
                  }
                  className="w-1/2"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveNewGoal}>
              Добавить цель
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Редактировать цель</DialogTitle>
            <DialogDescription>
              Измените параметры вашей цели здесь. Нажмите сохранить, когда
              закончите.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Название
              </Label>
              <Input
                id="edit-name"
                value={editingGoal?.name || ""}
                onChange={(e) =>
                  setEditingGoal((prev) =>
                    prev ? { ...prev, name: e.target.value } : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-start-value" className="text-right">
                Начальное значение
              </Label>
              <Input
                id="edit-start-value"
                type="number"
                value={editingGoal?.startValue || 0}
                onChange={(e) =>
                  setEditingGoal((prev) =>
                    prev
                      ? {
                          ...prev,
                          startValue: parseFloat(e.target.value) || 0,
                        }
                      : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-target" className="text-right">
                Цель
              </Label>
              <Input
                id="edit-target"
                type="number"
                value={editingGoal?.target || 0}
                onChange={(e) =>
                  setEditingGoal((prev) =>
                    prev
                      ? { ...prev, target: parseFloat(e.target.value) || 0 }
                      : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-unit" className="text-right">
                Единица
              </Label>
              <Input
                id="edit-unit"
                value={editingGoal?.unit || ""}
                onChange={(e) =>
                  setEditingGoal((prev) =>
                    prev ? { ...prev, unit: e.target.value } : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-type" className="text-right">
                Тип
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Select
                  value={editingGoal?.type || ""}
                  onValueChange={(value) =>
                    setEditingGoal((prev) =>
                      prev ? { ...prev, type: value } : null
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите тип цели" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...defaultTypes, ...customTypes].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                        {customTypes.includes(type) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteCustomType(type)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Свой тип"
                  value={editingGoal?.type || ""}
                  onChange={(e) =>
                    setEditingGoal((prev) =>
                      prev ? { ...prev, type: e.target.value } : null
                    )
                  }
                  className="w-1/2"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveEditedGoal}>
              Сохранить изменения
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isEditWorkoutWeightDialogOpen}
        onOpenChange={setIsEditWorkoutWeightDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Редактировать группу мышц</DialogTitle>
            <DialogDescription>
              Измените название группы мышц здесь. Нажмите сохранить, когда
              закончите.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-workout-name" className="text-right">
                Название
              </Label>
              <Input
                id="edit-workout-name"
                value={editingWorkoutWeight?.name || ""}
                onChange={(e) =>
                  setEditingWorkoutWeight((prev) =>
                    prev ? { ...prev, name: e.target.value } : null
                  )
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveEditedWorkoutWeight}>
              Сохранить изменения
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isGoalCompletionDialogOpen}
        onOpenChange={setIsGoalCompletionDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Поздравляем! Вы достигли цели!</AlertDialogTitle>
            <AlertDialogDescription>
              Вы достигли своей цели &quot;{completedGoal?.name}&quot;. Хотите
              сохранить её как достигнутую?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelGoalCompletion}>
              Я ошибся
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmGoalCompletion}>
              Подтвердить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={isChangesSummaryDialogOpen}
        onOpenChange={setIsChangesSummaryDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Поздравляем! Вы достигли новых результатов
            </DialogTitle>
            <DialogDescription>
              Вот список изменений, которые вы сделали:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {Object.entries(changeTracker.goals).map(([id, goal]) => (
              <div key={id}>
                <h4 className="font-semibold">{goal.name}</h4>
                <p>
                  Было: {goals.find((g) => g.id === parseInt(id))?.currentValue}{" "}
                  {goal.unit}
                </p>
                <p>
                  Стало: {goal.currentValue} {goal.unit}
                </p>
              </div>
            ))}
            {Object.entries(changeTracker.bodyParameters).map(
              ([name, value]) => (
                <div key={name}>
                  <h4 className="font-semibold">{name}</h4>
                  <p>
                    Было: {bodyParameters.find((p) => p.name === name)?.value}{" "}
                    {bodyParameters.find((p) => p.name === name)?.unit}
                  </p>
                  <p>
                    Стало: {value}{" "}
                    {bodyParameters.find((p) => p.name === name)?.unit}
                  </p>
                </div>
              )
            )}
            {Object.entries(changeTracker.workoutWeights).map(
              ([groupId, exercises]) => (
                <div key={groupId}>
                  <h4 className="font-semibold">
                    {
                      workoutWeights.find((w) => w.id === parseInt(groupId))
                        ?.name
                    }
                  </h4>
                  {Object.entries(exercises).map(([exerciseId, weight]) => {
                    const exercise = workoutWeights
                      .find((w) => w.id === parseInt(groupId))
                      ?.exercises.find((e) => e.id === parseInt(exerciseId))
                    return (
                      <div key={exerciseId}>
                        <p>{exercise?.name}</p>
                        <p>Было: {exercise?.weight} кг</p>
                        <p>Стало: {weight} кг</p>
                      </div>
                    )
                  })}
                </div>
              )
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsChangesSummaryDialogOpen(false)}>
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
