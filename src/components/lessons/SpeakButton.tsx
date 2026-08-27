"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Volume2 } from "lucide-react";

interface SpeakButtonProps {
  /** The English to read out loud. Comes from the lesson markdown. */
  text: string;
}

/** Nothing to subscribe to: support is fixed for the life of the page. */
const neverChanges = () => () => {};
const hasSpeechSynthesis = () => typeof window !== "undefined" && "speechSynthesis" in window;
const hasSpeechOnServer = () => false;

/**
 * Reads a word or a phrase out loud using the browser's own speech synthesis.
 *
 * A language course needs audio, and the two ways to get it are paying for a
 * text-to-speech service or asking the device the reader already owns. The
 * Web Speech API costs nothing, ships with every modern browser, needs no key
 * and no audio files, and works offline on most systems — at the price of the
 * voice being whatever the operating system provides, which varies between an
 * iPhone and an old Windows install.
 *
 * The lesson markdown stays agnostic about all of that: it marks audible text
 * as `[hello](say:)`, and this component is what that mark turns into. If the
 * device voices ever prove too poor, the mark can be pointed at pre-generated
 * audio files instead without touching a single lesson.
 *
 * Rendered as an icon with no text on purpose: `AnnotatedLesson` anchors
 * comments and reading marks to the article's text nodes, so a button that
 * contributed words would shift every anchor after it.
 */
export function SpeakButton({ text }: SpeakButtonProps) {
  const t = useTranslations("lesson");
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // The server has no `window`, so it renders nothing and the client fills the
  // button in on hydration. Read through `useSyncExternalStore` rather than an
  // effect: it gives React a server snapshot to hydrate against, so the two
  // renders never disagree.
  const supported = useSyncExternalStore(neverChanges, hasSpeechSynthesis, hasSpeechOnServer);

  // Deliberately independent of `supported`: this effect must keep the same
  // dependency array for the life of the component, so it does its own check
  // and runs once.
  useEffect(() => {
    if (!hasSpeechSynthesis()) return;

    // Voices load asynchronously in Chrome: the first `getVoices()` after a
    // cold page load usually returns an empty list, and the real one arrives
    // with the `voiceschanged` event.
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en"));
      voiceRef.current =
        voices.find((v) => v.lang === "en-US" && v.localService) ??
        voices.find((v) => v.lang === "en-US") ??
        voices[0] ??
        null;
    };

    pickVoice();
    window.speechSynthesis.addEventListener("voiceschanged", pickVoice);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pickVoice);
      window.speechSynthesis.cancel();
    };
  }, []);

  function speak(event: React.MouseEvent) {
    // The lesson article listens for clicks to place comments; pressing play
    // is not an attempt to annotate the text under the button.
    event.stopPropagation();
    event.preventDefault();

    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    // Two utterances at once come out as noise, and a queued one keeps playing
    // long after the reader moved on.
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceRef.current?.lang ?? "en-US";
    if (voiceRef.current) utterance.voice = voiceRef.current;
    // Slower than conversation on purpose: at A1 the point is to catch every
    // sound, not to keep up.
    utterance.rate = 0.85;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    synth.speak(utterance);
  }

  // Without the API there is nothing to offer, and a dead button would only
  // raise a question. The written pronunciation next to it still does its job.
  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={speak}
      aria-label={t("listen", { text })}
      title={t("listen", { text })}
      className={`not-prose ml-1 inline-flex h-6 w-6 shrink-0 translate-y-0.5 items-center justify-center rounded-full align-baseline transition-colors ${
        speaking
          ? "bg-indigo-600 text-white"
          : "text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
      }`}
    >
      <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  );
}
