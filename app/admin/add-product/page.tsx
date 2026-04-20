"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2, Upload, Plus, Package, DollarSign, Tag, Info, Image as ImageIcon } from "lucide-react"

export default function AddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB")
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!imageFile) {
      toast.error("Please select an image")
      return
    }

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const price = formData.get("price") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const series = formData.get("series") as string

    setLoading(true)
    
    try {
      // 1. Upload to Cloudinary (FREE Image Hosting)
      // Note: User must set these in .env.local
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

      if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary environment variables are missing. Please check .env.local")
      }

      const uploadData = new FormData()
      uploadData.append("file", imageFile)
      uploadData.append("upload_preset", uploadPreset)

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: uploadData,
        }
      )

      if (!cloudinaryRes.ok) {
        throw new Error("Failed to upload image to Cloudinary")
      }

      const cloudinaryData = await cloudinaryRes.json()
      const imageUrl = cloudinaryData.secure_url

      // 2. Save Product Metadata to Firebase Firestore
      await addDoc(collection(db, "products"), {
        name,
        price: parseFloat(price),
        description,
        category,
        series,
        imageUrl,
        createdAt: new Date().toISOString(),
      })

      toast.success("Product launched successfully!")
      router.push("/") 
    } catch (error: any) {
      console.error("Error adding product:", error)
      toast.error(error.message || "Launch failed. Check console for details.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4 flex justify-center items-start">
      <Card className="w-full max-w-2xl bg-zinc-950 border-white/5 shadow-2xl relative overflow-hidden">
        {/* Neon accent line at top */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
             <Package className="text-primary h-6 w-6" />
          </div>
          <CardTitle className="font-orbitron text-2xl tracking-tight text-white uppercase italic">GeekFactory Launchpad</CardTitle>
          <CardDescription className="text-zinc-500 font-medium uppercase tracking-widest text-[10px]">
            Deploy a new technical item to the GeekFactory Warehouse
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8">
            {/* Image Upload Area */}
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                <ImageIcon className="h-3 w-3" /> Image Upload
              </Label>
              <div 
                className={cn(
                  "relative group w-full aspect-[21/9] rounded-2xl border-2 border-dashed border-white/5 overflow-hidden flex items-center justify-center bg-zinc-900/30 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer",
                  imagePreview ? "border-solid bg-transparent" : ""
                )}
                onClick={() => document.getElementById("image-input")?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-zinc-600 group-hover:text-primary transition-colors">
                    <Upload className="h-10 w-10" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Drop image source</span>
                  </div>
                )}
                <input 
                  id="image-input"
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                  <Tag className="h-3 w-3" /> Product Title
                </Label>
                <Input id="name" name="name" placeholder="e.g. ULTRA INSTINCT GOKU" required className="bg-zinc-900/50 border-white/5 h-12 focus-visible:ring-primary" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="price" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                  <DollarSign className="h-3 w-3" /> Price (USD)
                </Label>
                <Input id="price" name="price" type="number" step="0.01" placeholder="249.99" required className="bg-zinc-900/50 border-white/5 h-12 focus-visible:ring-primary" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="series" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Series / Franchise</Label>
                <Input id="series" name="series" placeholder="e.g. Dragon Ball Super" required className="bg-zinc-900/50 border-white/5 h-12 focus-visible:ring-primary" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Inventory Category</Label>
                <select name="category" className="w-full h-12 rounded-lg bg-zinc-900/50 border border-white/5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer" required>
                  <option value="figures">FIGURINES</option>
                  <option value="manga">MANGA</option>
                  <option value="gaming">GAMING SETUP</option>
                  <option value="apparel">APPAREL</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                <Info className="h-3 w-3" /> Description
              </Label>
              <Textarea id="description" name="description" placeholder="Technical specifications and details..." required className="bg-zinc-900/50 border-white/5 min-h-[140px] focus-visible:ring-primary" />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-end gap-4 border-t border-white/5 pt-8 mt-4">
            <Button type="button" variant="ghost" onClick={() => router.back()} className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white order-2 sm:order-1">
              Abort Mission
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/80 text-white font-orbitron h-12 px-8 gap-3 shadow-[0_0_20px_rgba(220,38,38,0.2)] order-1 sm:order-2" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-5 w-5" />}
              LAUNCH PRODUCT
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
