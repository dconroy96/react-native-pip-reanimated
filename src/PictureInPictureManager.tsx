import type { PictureInPictureViewProps } from './types';
import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import PictureInPictureView from './PictureInPictureView';

type PictureInPictureManagerProps = {
  pipProps: PictureInPictureViewProps;
  children?: React.ReactNode;
};

type PictureInPictureContextValue = {
  activeView: null | React.ReactNode;
  setActiveView: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
};

export const PictureInPictureContext =
  React.createContext<PictureInPictureContextValue>({
    activeView: null,
    setActiveView: () => {},
  });
PictureInPictureContext.displayName = 'PictureInPictureContext';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

function PictureInPictureManager({
  pipProps,
  children,
}: PictureInPictureManagerProps) {
  const [activeView, setActiveView] = useState(null);

  const ctxValue = useMemo(
    () => ({
      activeView,
      setActiveView,
    }),
    [activeView, setActiveView]
  );

  const onDestroy = useCallback(() => setActiveView(null), []);

  return (
    <PictureInPictureContext.Provider value={ctxValue}>
      <View style={styles.flex}>
        {children}
        {activeView !== null && (
          <PictureInPictureView {...pipProps} onDestroy={onDestroy}>
            {activeView}
          </PictureInPictureView>
        )}
      </View>
    </PictureInPictureContext.Provider>
  );
}

export default PictureInPictureManager;
