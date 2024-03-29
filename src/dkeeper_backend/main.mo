import List "mo:base/List";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
actor DKeeper {

  public type Note = {
    title: Text;
    content: Text;
  };

  stable var notes: List.List<Note> = List.nil<Note>(); 
  //"stable" will persist notes, even if being re-deployed, kind of like a database

  public func createNote(titleText: Text, contentText: Text) {

    let newNote: Note = {
      title = titleText;
      content = contentText;
    };

    notes := List.push(newNote, notes); //push() will create a new list
    Debug.print(debug_show(notes));
  };

  public query func readNotes(): async [Note] {
    //list is more efficient in being processed on blockchain; 
    //array is easier to be handled in the JS in this case
    return List.toArray(notes);
  };

  public func removeNote(id: Nat) {
    let notes1: List.List<Note> = List.take(notes, id); //take the first id elements
    let notes2: List.List<Note> = List.drop(notes, (id+1)); //drop the first id+1 elements
    notes := List.append(notes1, notes2);
  };

}