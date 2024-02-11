import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CopyPageData, OperationPosition, SurveyPage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { placePageSchema } from "@/lib/validationSchemas";
import useSurveyPages from "@/lib/hooks/useSurveyPages";
import { useLoadingToast } from "@/lib/hooks/useLoadingToast";
import useMoveSurveyPage from "@/lib/hooks/useMoveSurveyPage";

type MovePageDialogProps = {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  surveyId: string;
  currentPage: SurveyPage;
  setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

const MoveSurvePageDialog = ({
  isOpen,
  onOpenChange,
  surveyId,
  currentPage,
  setCurrentPageNumber,
}: MovePageDialogProps) => {
  const { surveyPages } = useSurveyPages(surveyId);

  const { movePageMutation, isPending } = useMoveSurveyPage();
  const form = useForm<CopyPageData>({
    resolver: zodResolver(placePageSchema),
    defaultValues: {
      pageId: surveyPages!.find((page) => page.number === 1)?.id ?? "",
      position: OperationPosition.after,
    },
  });

  useLoadingToast(isPending);

  const handleSubmit = (values: CopyPageData) => {
    console.log(values);
    movePageMutation(
      {
        surveyId,
        sourcePageId: currentPage.id,
        data: { position: values.position, pageId: values.pageId },
      },
      {
        onSuccess(data) {
          setCurrentPageNumber(data.number);
          form.reset({
            position: OperationPosition.after,
            pageId: surveyPages!.find((page) => page.number === 1)?.id ?? "",
          });
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog modal onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Move Page {currentPage.number}</DialogTitle>
        </DialogHeader>
        <div className="gap-2 mt-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex items-end gap-2"
            >
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem className="min-w-[100px]">
                    <FormLabel>Position</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={OperationPosition.after}>
                          After
                        </SelectItem>
                        <SelectItem value={OperationPosition.before}>
                          Before
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pageId"
                render={({ field }) => (
                  <FormItem className="min-w-[70px]">
                    <FormLabel>Page</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {surveyPages?.map((page) => {
                          return (
                            <SelectItem key={page.id} value={page.id}>
                              {page.number}.
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)} size="sm">
              Cancel
            </Button>
            <Button onClick={form.handleSubmit(handleSubmit)} size="sm">
              Move page
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoveSurvePageDialog;
