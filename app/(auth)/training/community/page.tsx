import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MapSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Карта тренировок</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video flex items-center justify-center">
          <p>Здесь будет карта с местами для тренировок</p>
        </div>
      </CardContent>
    </Card>
  )
}
