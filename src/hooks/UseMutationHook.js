import { useMutation } from "@tanstack/react-query";

const UseMutationHook = (fnCallBack) => {
    const mutation = useMutation({
        mutationFn: fnCallBack,
    });
    return mutation;
};

export default UseMutationHook;
