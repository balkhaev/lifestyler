import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TasksSection() {
  const dailyTasks = [
    "Выполнить 10000 шагов",
    "Выпить 2 литра воды",
    "Сделать растяжку",
  ]
  const weeklyTasks = [
    "Тренироваться 4 раза",
    "Попробовать новое упражнение",
    "Пригласить друга на тренировку",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Задания</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList>
            <TabsTrigger value="daily">Ежедневные</TabsTrigger>
            <TabsTrigger value="weekly">Еженедельные</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            <ul className="list-disc list-inside">
              {dailyTasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="weekly">
            <ul className="list-disc list-inside">
              {weeklyTasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
