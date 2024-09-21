import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProgramSection() {
  const exercises = [
    {
      name: "Жим лежа",
      description:
        "Лежа на скамье, опустите штангу к груди и поднимите обратно",
    },
    {
      name: "Приседания",
      description:
        "Встаньте прямо, опуститесь, сгибая колени, затем поднимитесь",
    },
    {
      name: "Становая тяга",
      description: "Наклонитесь и поднимите штангу с пола, выпрямляя спину",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Программа тренировок</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{exercise.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{exercise.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
