"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { suggestTagsAction } from './actions';
import { useToast } from '@/hooks/use-toast';

const itemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  category: z.string().min(1, "Please select a category"),
  size: z.string().min(1, "Please select a size"),
  condition: z.string().min(1, "Please select a condition"),
});

type ItemFormValues = z.infer<typeof itemSchema>;

export default function AddItemPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: { title: "", description: "", category: "", size: "", condition: "" },
  });

  const formValues = watch();

  const handleSuggestTags = async () => {
    if (!formValues.title || !formValues.description || !formValues.category) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in Title, Description, and Category to get tag suggestions.",
      });
      return;
    }
    setIsSuggesting(true);
    try {
      const result = await suggestTagsAction({
        title: formValues.title,
        description: formValues.description,
        category: formValues.category,
      });

      if (result.success && result.data) {
        setTags(prevTags => [...new Set([...prevTags, ...result.data.tags])]);
        toast({
          title: "Tags Suggested!",
          description: "We've added some AI-powered tag suggestions for your item.",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: "Could not suggest tags. Please try again.",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim() !== '') {
      e.preventDefault();
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const onSubmit = (data: ItemFormValues) => {
    console.log({ ...data, tags });
    toast({
      title: "Item Listed!",
      description: `${data.title} is now available for swapping.`,
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mx-auto grid max-w-4xl flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            List a New Item
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" type="button">Discard</Button>
            <Button type="submit">List Item</Button>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>Provide the essential details about your clothing item.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" {...register('title')} placeholder="e.g., Vintage Blue Denim Jacket" />
                  {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" {...register('description')} placeholder="Describe the item's style, material, and any unique features." />
                  {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tags</CardTitle>
                    <CardDescription>Add tags to help others discover your item.</CardDescription>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={handleSuggestTags} disabled={isSuggesting}>
                    {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Suggest Tags
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input 
                  placeholder="Add a tag and press Enter" 
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                />
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>Upload up to 5 images.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed">
                    <UploadCloud className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click or drag to upload</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Categorization</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <Label>Category</Label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tops">Tops</SelectItem>
                          <SelectItem value="bottoms">Bottoms</SelectItem>
                          <SelectItem value="dresses">Dresses</SelectItem>
                          <SelectItem value="outerwear">Outerwear</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                          <SelectItem value="shoes">Shoes</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
                </div>
                <div>
                  <Label>Size</Label>
                   <Controller
                    name="size"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger><SelectValue placeholder="Select a size" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="xs">Extra Small</SelectItem>
                          <SelectItem value="s">Small</SelectItem>
                          <SelectItem value="m">Medium</SelectItem>
                          <SelectItem value="l">Large</SelectItem>
                          <SelectItem value="xl">Extra Large</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                   {errors.size && <p className="text-sm text-red-500 mt-1">{errors.size.message}</p>}
                </div>
                <div>
                  <Label>Condition</Label>
                   <Controller
                    name="condition"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger><SelectValue placeholder="Select a condition" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New with tags</SelectItem>
                          <SelectItem value="like-new">Like New</SelectItem>
                          <SelectItem value="gently-used">Gently Used</SelectItem>
                          <SelectItem value="used">Used</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                   {errors.condition && <p className="text-sm text-red-500 mt-1">{errors.condition.message}</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
         <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" type="button">Discard</Button>
            <Button type="submit">List Item</Button>
          </div>
      </div>
    </form>
  );
}
