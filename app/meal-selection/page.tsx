"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { PlusCircle, Edit, Check, X, FlameIcon as Fire, Dumbbell, Wheat, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const initialMealPlans = [
  {
    id: "plan-1",
    name: "Vegetarian",
    description: "Plant-based meals with a variety of vegetables, grains, and proteins.",
    meals: [
      {
        id: "meal-1",
        name: "Roasted Vegetable Bowl",
        description: "Roasted seasonal vegetables with quinoa and tahini dressing.",
        calories: 450,
        protein: 15,
        carbs: 60,
        fat: 18,
        allergens: ["Sesame"],
        image: "/placeholder.svg?height=200&width=300",
        inMenu: false,
      },
      {
        id: "meal-2",
        name: "Spinach and Feta Stuffed Portobello",
        description: "Portobello mushrooms stuffed with spinach, feta, and herbs.",
        calories: 380,
        protein: 12,
        carbs: 28,
        fat: 22,
        allergens: ["Dairy"],
        image: "/placeholder.svg?height=200&width=300",
        inMenu: true,
      },
      {
        id: "meal-3",
        name: "Lentil Shepherd's Pie",
        description: "Savory lentil filling topped with mashed potatoes.",
        calories: 520,
        protein: 18,
        carbs: 75,
        fat: 15,
        allergens: [],
        image: "/placeholder.svg?height=200&width=300",
        inMenu: false,
      },
      {
        id: "meal-4",
        name: "Mediterranean Chickpea Salad",
        description: "Chickpeas with cucumber, tomato, olives, and feta cheese.",
        calories: 410,
        protein: 14,
        carbs: 45,
        fat: 20,
        allergens: ["Dairy"],
        image: "/placeholder.svg?height=200&width=300",
        inMenu: true,
      },
    ],
  },
  {
    id: "plan-2",
    name: "Keto",
    description: "Low-carb, high-fat meals designed for the ketogenic diet.",
    meals: [
      {
        id: "meal-5",
        name: "Bacon Wrapped Chicken",
        description: "Chicken breast wrapped in bacon with avocado sauce.",
        calories: 580,
        protein: 45,
        carbs: 5,
        fat: 42,
        allergens: [],
        image: "/placeholder.svg?height=200&width=300",
        inMenu: true,
      },
      {
        id: "meal-6",
        name: "Cauliflower Steak",
        description: "Roasted cauliflower steak with herb butter and almonds.",
        calories: 320,
        protein: 8,
        carbs: 12,
        fat: 28,
        allergens: ["Nuts", "Dairy"],
        image: "/placeholder.svg?height=200&width=300",
        inMenu: false,
      },
      {
        id: "meal-7",
        name: "Salmon with Creamed Spinach",
        description: "Grilled salmon fillet with creamy spinach.",
        calories: 490,
        protein: 35,
        carbs: 8,
        fat: 35,
        allergens: ["Fish", "Dairy"],
        image: "/placeholder.svg?height=200&width=300",
        inMenu: true,
      },
    ],
  },
  {
    id: "plan-3",
    name: "Paleo",
    description: "Meals based on foods similar to what might have been eaten during the Paleolithic era.",
    meals: [
      {
        id: "meal-8",
        name: "Grilled Steak with Sweet Potatoes",
        description: "Grass-fed steak with roasted sweet potatoes and herbs.",
        calories: 520,
        protein: 32,
        carbs: 35,
        fat: 28,
        allergens: [],
        image: "/placeholder.svg?height=200&width=300",
        inMenu: true,
      },
      {
        id: "meal-9",
        name: "Coconut Chicken Curry",
        description: "Chicken in coconut milk with vegetables and spices.",
        calories: 450,
        protein: 28,
        carbs: 18,
        fat: 30,
        allergens: [],
        image: "/placeholder.svg?height=200&width=300",
        inMenu: false,
      },
    ],
  },
]

export default function MealSelectionPage() {
  const [mealPlans, setMealPlans] = useState(initialMealPlans)
  const [editingMeal, setEditingMeal] = useState<any>(null)
  const [originalMeal, setOriginalMeal] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isNewMealDialogOpen, setIsNewMealDialogOpen] = useState(false)
  const [newMeal, setNewMeal] = useState({
    name: "",
    description: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    allergens: "",
    planId: "plan-1",
  })

  const handleAddToMenu = (planId: string, mealId: string) => {
    setMealPlans((prevPlans) =>
      prevPlans.map((plan) => {
        if (plan.id === planId) {
          return {
            ...plan,
            meals: plan.meals.map((meal) => {
              if (meal.id === mealId) {
                return { ...meal, inMenu: !meal.inMenu }
              }
              return meal
            }),
          }
        }
        return plan
      }),
    )
  }

  const handleEditMeal = (meal: any, planId: string) => {
    setOriginalMeal({ ...meal, planId })
    setEditingMeal({ ...meal, planId })
    setIsEditDialogOpen(true)
  }

  const saveEditedMeal = () => {
    if (!editingMeal || !originalMeal) return

    // Store the edited meal for potential undo
    const updatedMeal = { ...editingMeal }

    setMealPlans((prevPlans) =>
      prevPlans.map((plan) => {
        if (plan.id === editingMeal.planId) {
          return {
            ...plan,
            meals: plan.meals.map((meal) => {
              if (meal.id === editingMeal.id) {
                return editingMeal
              }
              return meal
            }),
          }
        }
        return plan
      }),
    )

    // Add toast notification with undo button
    toast.success("Meal updated successfully", {
      description: `${editingMeal.name} has been updated.`,
      action: {
        label: "Undo",
        onClick: () => {
          // Restore the original meal
          setMealPlans((prevPlans) =>
            prevPlans.map((plan) => {
              if (plan.id === originalMeal.planId) {
                return {
                  ...plan,
                  meals: plan.meals.map((meal) => {
                    if (meal.id === originalMeal.id) {
                      return originalMeal
                    }
                    return meal
                  }),
                }
              }
              return plan
            }),
          )

          // Show confirmation toast
          toast.success("Changes reverted", {
            description: `${originalMeal.name} has been restored to its previous state.`,
          })
        },
      },
    })

    setEditingMeal(null)
    setOriginalMeal(null)
    setIsEditDialogOpen(false)
  }

  const handleNewMealChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewMeal((prev) => ({
      ...prev,
      [name]:
        name === "calories" || name === "protein" || name === "carbs" || name === "fat"
          ? Number.parseInt(value) || 0
          : value,
    }))
  }

  const handleNewMealPlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewMeal((prev) => ({
      ...prev,
      planId: e.target.value,
    }))
  }

  const addNewMeal = () => {
    const allergensList = newMeal.allergens
      .split(",")
      .map((a) => a.trim())
      .filter((a) => a)

    const mealToAdd = {
      id: `meal-${Date.now()}`,
      name: newMeal.name,
      description: newMeal.description,
      calories: newMeal.calories,
      protein: newMeal.protein,
      carbs: newMeal.carbs,
      fat: newMeal.fat,
      allergens: allergensList,
      image: "/placeholder.svg?height=200&width=300",
      inMenu: false,
    }

    setMealPlans((prevPlans) =>
      prevPlans.map((plan) => {
        if (plan.id === newMeal.planId) {
          return {
            ...plan,
            meals: [...plan.meals, mealToAdd],
          }
        }
        return plan
      }),
    )

    setNewMeal({
      name: "",
      description: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      allergens: "",
      planId: "plan-1",
    })

    setIsNewMealDialogOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader
        title="Meal Selection"
        description="Manage weekly meal selections and plans"
        actions={
          <Button aria-label="Add new meal" className="gap-1 rounded-full" onClick={() => setIsNewMealDialogOpen(true)}>
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
            Add New Meal
          </Button>
        }
      />
      <div className="dashboard-section">
        <Tabs defaultValue="plan-1" className="w-full">
          <TabsList className="mb-6 w-full justify-start rounded-full bg-muted/50 p-1">
            {mealPlans.map((plan) => (
              <TabsTrigger key={plan.id} value={plan.id} className="rounded-full">
                {plan.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {mealPlans.map((plan) => (
            <TabsContent key={plan.id} value={plan.id}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">{plan.name} Plan</h2>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plan.meals.map((meal) => (
                  <Card key={meal.id} className="meal-card group">
                    <div className="relative overflow-hidden">
                      <img
                        src={meal.image || "/placeholder.svg"}
                        alt={`${meal.name} meal`}
                        className="meal-card-image"
                      />
                      {meal.inMenu && (
                        <div className="absolute right-3 top-3 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                          On Menu
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between">
                        {meal.name}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => handleEditMeal(meal, plan.id)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit {meal.name}</span>
                        </Button>
                      </CardTitle>
                      <CardDescription>{meal.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-1 rounded-lg bg-muted/50 p-2">
                          <Fire className="h-4 w-4 text-primary" />
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Calories</span>
                            <span className="font-medium">{meal.calories}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 rounded-lg bg-muted/50 p-2">
                          <Dumbbell className="h-4 w-4 text-primary" />
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Protein</span>
                            <span className="font-medium">{meal.protein}g</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 rounded-lg bg-muted/50 p-2">
                          <Wheat className="h-4 w-4 text-primary" />
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Carbs</span>
                            <span className="font-medium">{meal.carbs}g</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 rounded-lg bg-muted/50 p-2">
                          <div className="h-4 w-4 rounded-full bg-primary/20 text-center text-[10px] font-bold text-primary">
                            F
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Fat</span>
                            <span className="font-medium">{meal.fat}g</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        {meal.allergens.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {meal.allergens.map((allergen: string) => (
                              <Badge
                                key={allergen}
                                variant="outline"
                                className="flex items-center gap-1 rounded-full bg-destructive/10 text-destructive"
                              >
                                <AlertCircle className="h-3 w-3" />
                                {allergen}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">No allergens</span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button
                        size="sm"
                        variant={meal.inMenu ? "outline" : "default"}
                        onClick={() => handleAddToMenu(plan.id, meal.id)}
                        className={`w-full gap-1 rounded-full ${
                          meal.inMenu ? "border-primary text-primary hover:bg-primary/10" : ""
                        }`}
                      >
                        {meal.inMenu ? (
                          <>
                            <X className="h-4 w-4" />
                            Remove from Menu
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4" />
                            Add to Menu
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Edit Meal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Meal</DialogTitle>
            <DialogDescription>Make changes to the meal details.</DialogDescription>
          </DialogHeader>
          {editingMeal && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingMeal.name}
                  onChange={(e) => setEditingMeal({ ...editingMeal, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={editingMeal.description}
                  onChange={(e) => setEditingMeal({ ...editingMeal, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-calories" className="text-right">
                  Calories
                </Label>
                <Input
                  id="edit-calories"
                  type="number"
                  value={editingMeal.calories}
                  onChange={(e) => setEditingMeal({ ...editingMeal, calories: Number.parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-protein" className="text-right">
                  Protein (g)
                </Label>
                <Input
                  id="edit-protein"
                  type="number"
                  value={editingMeal.protein}
                  onChange={(e) => setEditingMeal({ ...editingMeal, protein: Number.parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-carbs" className="text-right">
                  Carbs (g)
                </Label>
                <Input
                  id="edit-carbs"
                  type="number"
                  value={editingMeal.carbs}
                  onChange={(e) => setEditingMeal({ ...editingMeal, carbs: Number.parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-fat" className="text-right">
                  Fat (g)
                </Label>
                <Input
                  id="edit-fat"
                  type="number"
                  value={editingMeal.fat}
                  onChange={(e) => setEditingMeal({ ...editingMeal, fat: Number.parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={saveEditedMeal} className="gap-1 rounded-full">
              <Check className="h-4 w-4" />
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Meal Dialog */}
      <Dialog open={isNewMealDialogOpen} onOpenChange={setIsNewMealDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Meal</DialogTitle>
            <DialogDescription>Create a new meal to add to your meal plans.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4" role="form" aria-labelledby="new-meal-form">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plan" className="text-right">
                Plan
              </Label>
              <select
                id="plan"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newMeal.planId}
                onChange={handleNewMealPlanChange}
                aria-label="Select meal plan"
              >
                {mealPlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={newMeal.name}
                onChange={handleNewMealChange}
                className="col-span-3"
                aria-label="Meal name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={newMeal.description}
                onChange={handleNewMealChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="calories" className="text-right">
                Calories
              </Label>
              <Input
                id="calories"
                name="calories"
                type="number"
                value={newMeal.calories}
                onChange={handleNewMealChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="protein" className="text-right">
                Protein (g)
              </Label>
              <Input
                id="protein"
                name="protein"
                type="number"
                value={newMeal.protein}
                onChange={handleNewMealChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carbs" className="text-right">
                Carbs (g)
              </Label>
              <Input
                id="carbs"
                name="carbs"
                type="number"
                value={newMeal.carbs}
                onChange={handleNewMealChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fat" className="text-right">
                Fat (g)
              </Label>
              <Input
                id="fat"
                name="fat"
                type="number"
                value={newMeal.fat}
                onChange={handleNewMealChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="allergens" className="text-right">
                Allergens
              </Label>
              <Input
                id="allergens"
                name="allergens"
                placeholder="Comma separated (e.g. Dairy, Nuts)"
                value={newMeal.allergens}
                onChange={handleNewMealChange}
                className="col-span-3"
                aria-describedby="allergens-desc"
              />
              <div id="allergens-desc" className="sr-only">
                Enter allergens separated by commas
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={addNewMeal} className="gap-1 rounded-full">
              <Check className="h-4 w-4" />
              Add Meal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

