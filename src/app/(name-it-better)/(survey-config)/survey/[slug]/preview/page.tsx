"use client";
import React from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

const Preview = () => {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const texts = [
    "Vero quidem quae incidunt alias vitae quos optio tenetur consequuntur odit iure eligendi doloribus dignissimos voluptate possimus aperiam minus iusto voluptates mollitia suscipit voluptates molestias maiores unde eligendi perferendis veniam doloribus magnam enim eum harum error repellat perferendis qui a voluptate dolorem officia omnis placeat quo error minima possimus dolores sed tempora illo atque nam officia et veritatis.",
    "Debitis earum quia nisi nemo numquam excepturi beatae optio nam nihil aperiam hic velit ipsum dolorum ducimus sapiente dolorem distinctio fuga natus aperiam dolorem id ipsam qui asperiores nihil tempore consequuntur dolor perferendis atque architecto voluptas dignissimos distinctio ducimus facere quis.",
    "Alias ipsa vel a qui sit animi laboriosam hic nihil odit a architecto dolore unde consequatur et itaque omnis esse sunt laborum temporibus eum et suscipit.",
    "Perspiciatis doloribus rem voluptatem omnis dolores sapiente esse rem atque quisquam voluptatem illo impedit reprehenderit vitae nisi veniam nesciunt magni quia quasi velit unde incidunt pariatur atque voluptatibus dolor nulla eius consequuntur odit sapiente quidem debitis molestias aliquam dolor.",
  ];
  const virtualizer = useWindowVirtualizer({
    count: 50,
    estimateSize: () => 50,
    overscan: 20,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });
  const items = virtualizer.getVirtualItems();
  return (
    <div ref={listRef}>
      <div
        className="w-full relative"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${
              items[0]?.start - virtualizer.options.scrollMargin
            }px)`,
          }}
        >
          {items.map((virtualRow) => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              // style={{
              //   position: "absolute",
              //   top: 0,
              //   left: 0,
              //   width: "100%",
              //   height: `${virtualRow.size}px`,

              // }}
              className="pb-3"
            >
              <div style={{ padding: "10px 0" }} className="bg-red-300">
                <div>Row {virtualRow.index}</div>
                <div>
                  {virtualRow.index % 2 === 0
                    ? texts[0]
                    : virtualRow.index % 3
                    ? texts[1]
                    : texts[2]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preview;
