import React, { FC, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { EatingHabitTipType } from "screens/modules/education/EducationScreen";
import DefaultTipCard from "./DefaultTipCard";
import i18next from "i18next";

type Props = {
  data: EatingHabitTipType[];
  setSelected: (item: EatingHabitTipType) => void;
};

const DefaultTipsCarousel: FC<Props> = ({ data, setSelected }) => {
  const { width } = useWindowDimensions();
  const currentLanguage = i18next.language as "cs" | "en";

  const SIZE = width * 0.8;
  const x = useSharedValue(0);

  const onSelectHandler = (item: EatingHabitTipType) => {
    setSelected(item);
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  const [newData] = useState([{ id: undefined }, ...data, { id: undefined }]);
  return (
    <Animated.ScrollView
      style={{ marginTop: 10, paddingBottom: 15 }}
      horizontal
      showsHorizontalScrollIndicator={true}
      bounces={false}
      scrollEventThrottle={16}
      snapToInterval={SIZE}
      onScroll={onScroll}
      decelerationRate={"fast"}
    >
      {newData.map((item, index) => {
        if (item.id === undefined) {
          return <View style={{ width: 10 }} key={index} />;
        }
        return (
          <DefaultTipCard
            key={index}
            width={SIZE}
            item={item}
            index={index}
            x={x}
            onPress={onSelectHandler}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

export default DefaultTipsCarousel;
