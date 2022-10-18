import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  IStatusLoading,
  setStatusLoadingClose,
} from "@redux/slides/uiState/loading";
import { FC, useEffect } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";

const LoadingContainer = styled.div`
  ${tw`absolute h-[4px] w-full top-0 left-0 right-0 z-[100] overflow-hidden`}
`;

const Load = styled.div<{ status: IStatusLoading; time: number }>`
  ${tw`h-full w-full bg-green-500`}
  ${({ status, time }) => {
    switch (status) {
      case "close":
        return css`
          transform: translateX(-100%);
        `;
      case "start":
        return css`
          transform: translateX(-40%);
          transition: all ${time}s cubic-bezier(0.39, 0.575, 0.565, 1);
        `;
      case "close":
        return css`
          transform: translateX(0);
          transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
        `;
    }
  }};
`;

interface ILoading {}

const Loading: FC<ILoading> = () => {
  const dispatch = useAppDispatch();
  const { status, time } = useAppSelector(
    (state) => state.uiStateReducers.loadingReducer
  );

  useEffect(() => {
 

    if (status === "end") {
      dispatch(setStatusLoadingClose());
    }
  }, [status]);

  return (
    <LoadingContainer>
      <Load time={time} status={status} />
    </LoadingContainer>
  );
};

export default Loading;
