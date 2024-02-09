import { Meal } from "data/mock/meals";
import React, { FC, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import MealCarouselCard from "./MealCarouselCard";

type Item = Meal;

type Items = Item[];

type Props = {
  data: Items;
};

const MealCarousel: FC<Props> = ({ data }) => {
  const { width } = useWindowDimensions();
  const SIZE = width * 0.8;
  const x = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  const [newData] = useState([
    { image: undefined },
    ...data,
    { image: undefined },
  ]);
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
        if (item.image === undefined) {
          return <View style={{ width: 10 }} key={index} />;
        }
        return (
          <MealCarouselCard
            key={index}
            width={SIZE}
            item={item}
            index={index}
            x={x}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

export default MealCarousel;
