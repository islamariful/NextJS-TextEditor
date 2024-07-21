# Apollo-TextEditor

## Progress Tracking:
### Jul 19th:
- Sidebar link added routing to a page with a resizable text input component using TipTap.

### Jul 20th:
- Added Toolbar and editor functionality. Updated Editor and document sidebar (dummy data)
- Added 3 Dot dropdown to documents in sidebar for delete (will add replay history here). Updated Editor region UI
- Added replay history: functionality needs work (bug: only the last document in the list actually shows history)
- Replay History bug fixed!

### Jul 21st (Final Update):
- Added New Replay History Functionality: Skip Forward (goes to the very end) and Skip Backward (goes to the very start)
- Removed Editor buttons: List and Header. There is a bug with Tiptap and react/ts versions that prevents it from integrating to the rest of the mosaic project (Version issue, had to go digging in package dependencies and it messes with prod build). The buttons "work" (the code runs and the text gets appropriate tags, but can't be viewed on editor screen)

## Task Checklist:
Task:
Integrate Tiptap (done) with the template for the following functionalities:
- edit document (done)
- save and reopen document (done)
- record edit history (done, save button on toolbar)
- replay edit history (done, in "..." dropdown menu)

