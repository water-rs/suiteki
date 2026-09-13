//! `Debug` prints the string, and never which of the three representations is
//! holding it.

#[test]
fn debug_prints_the_string_for_every_representation() {
    let owned = "owned value".parse::<suiteki::Str>().unwrap();
    let borrowed = suiteki::Str::from_static("static value");
    let shared = suiteki::Str::from(String::from("an owned value far too long to fit inline"));
    assert_eq!(format!("{owned:?}"), "\"owned value\"");
    assert_eq!(format!("{borrowed:?}"), "\"static value\"");
    assert_eq!(
        format!("{shared:?}"),
        "\"an owned value far too long to fit inline\""
    );
    assert_eq!(format!("{:?}", Some(owned)), "Some(\"owned value\")");
}

#[test]
fn the_same_text_debugs_the_same_way_however_it_is_stored() {
    // Nothing in the output may depend on where the bytes live, so the same
    // text built three different ways has to print identically.
    let text = "borrowed, inline or shared";
    let borrowed = suiteki::Str::from_static(text);
    let owned = suiteki::Str::from(String::from(text));
    let short = "short".parse::<suiteki::Str>().unwrap();

    assert_eq!(format!("{borrowed:?}"), format!("{owned:?}"));
    assert_eq!(format!("{borrowed:?}"), format!("{text:?}"));
    assert_eq!(format!("{short:?}"), format!("{:?}", "short"));
}

#[test]
fn display_preserves_unicode_width_precision_and_padding() {
    for text in ["", "a\0b", "é水", "a long heap string containing 水滴"] {
        for value in [
            suiteki::Str::from_static(text),
            suiteki::Str::from(String::from(text)),
            text.parse::<suiteki::Str>().unwrap(),
        ] {
            assert_eq!(format!("{value}"), text);
            assert_eq!(format!("{value:>20.3}"), format!("{text:>20.3}"));
            assert_eq!(format!("{value:*^20.3}"), format!("{text:*^20.3}"));
            assert_eq!(format!("{value:.0}"), format!("{text:.0}"));
            assert_eq!(format!("{value:#}"), format!("{text:#}"));
            assert_eq!(format!("{value:>0}"), format!("{text:>0}"));
        }
    }
    let long = "x".repeat(4096);
    for value in [
        suiteki::Str::from(long.clone()),
        long.parse::<suiteki::Str>().unwrap(),
    ] {
        assert_eq!(value.to_string(), long);
        assert_eq!(format!("{value:>20.3}"), format!("{long:>20.3}"));
    }
}

#[test]
fn display_propagates_writer_errors() {
    use core::fmt::{self, Write};
    struct Refusing;
    impl Write for Refusing {
        fn write_str(&mut self, _: &str) -> fmt::Result {
            Err(fmt::Error)
        }
    }
    let value = "content".parse::<suiteki::Str>().unwrap();
    assert!(write!(&mut Refusing, "{value}").is_err());
    assert!(write!(&mut Refusing, "{value:>20.3}").is_err());
}
