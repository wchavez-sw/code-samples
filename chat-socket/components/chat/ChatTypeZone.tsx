import { Button } from "@components/buttons";
import { TextInput } from "@components/forms";
import { useChatContext } from "@contexts/chat";
import { chatServices } from "@services";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type FormData = {
  message: string;
};

const ChatTypeZone = () => {
  const { currentChatId } = useChatContext();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const mutation = useMutation(chatServices.sendMessage);

  const onSubmit = async (data: FormData) => {
    await mutation.mutate({
      id: currentChatId!,
      message: data.message,
    });

    reset();
  };

  return (
    <div className="p-4 bg-slate-200">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <TextInput
            placeholder="Escribe un mensaje..."
            {...register("message", {
              required: true,
            })}
          />
          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </div>
  );
};

export default ChatTypeZone;
