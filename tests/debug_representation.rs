//! `Debug` prints the string, and never which of the three representations is
//! holding it.

#[test]
fn debug_prints_the_string_for_every_representation() {
    let owned = suiteki::Str::from(String::from("owned value"));
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
    let short = suiteki::Str::from(String::from("short"));

    assert_eq!(format!("{borrowed:?}"), format!("{owned:?}"));
    assert_eq!(format!("{borrowed:?}"), format!("{text:?}"));
    assert_eq!(format!("{short:?}"), format!("{:?}", "short"));
}
