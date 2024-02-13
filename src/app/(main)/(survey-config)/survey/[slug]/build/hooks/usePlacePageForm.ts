import { PlacePageData } from "@/lib/types";
import { placePageSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function usePlacePageForm(initValues: PlacePageData) {
  const form = useForm<PlacePageData>({
    resolver: zodResolver(placePageSchema),
    defaultValues: {
      pageId: initValues.pageId,
      position: initValues.position,
    },
  });

  return form;
}
