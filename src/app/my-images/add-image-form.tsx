"use client";

import { addImage } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import FormButton from "@/components/form-button";
import { useToast } from "@/components/ui/use-toast";

export default function AddImageForm() {
  const [showForm, setShowForm] = useState(false);
  const [formState, action] = useFormState(addImage, {
    error: "",
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (formState.success) {
      toast({
        variant: "default",
        className: "bg-green-500",
        description: "Image added successfully",
      });
      setShowForm(false);
      formRef.current?.reset();
    }
  }, [formState, showForm, toast]);

  return (
    <div className={showForm ? "border-b" : ""}>
      <Button onClick={() => setShowForm(!showForm)} className="mt-6">
        Add Image
      </Button>
      {showForm && (
        <div>
          <form ref={formRef} action={action} className="py-6">
            <div className="py-4 grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="image">Image</Label>
              <Input name="image" id="image" type="file" />
            </div>
            <div className="py-4 grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">Image title</Label>
              <Input name="title" id="title" type="text" />
            </div>
            <div className="py-4 grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="description">Image description</Label>
              <Input name="description" id="description" type="text" />
            </div>
            <FormButton>Add</FormButton>
          </form>
          {formState.error && (
            <p className="text-red-500 text-sm">{formState.error}</p>
          )}
        </div>
      )}
    </div>
  );
}
