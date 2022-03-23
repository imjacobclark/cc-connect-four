use yew::prelude::*;
use gloo_timers::callback::Interval;

mod board;

enum Msg {
    RefetchDataFromAPI
}

struct App {
    i: i32
}

impl Component for App {
    type Message = Msg;
    type Properties = ();

    fn create(_ctx: &Context<Self>) -> Self {
        let link = _ctx.link().clone();

        Interval::new(1_000, || {
            panic!("Hello World")
        }).forget();
        
        Self {
            i: 0
        }
    }

    fn update(&mut self, _ctx: &Context<Self>, msg: Self::Message) -> bool {
        match msg {
            Msg::RefetchDataFromAPI => {
                self.i = self.i + 1;

                true
            }
        }
    }

    fn view(&self, ctx: &Context<Self>) -> Html {
        let link = ctx.link();
        let positions = (0..=41).collect::<Vec<_>>();

        html! {
            <div id="container">
                {
                    positions.into_iter().map(|id| {
                        html!{<div id="container" key={id}><button>{ "" }</button></div>}
                    }).collect::<Html>()
                }
            </div>
        }
    }
}

fn main() {
    yew::start_app::<App>();
}